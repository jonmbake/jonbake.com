---
layout: default
title: "Setting up a Rails Build on AWS CodeBuild"
tags:
  - walkthroughs
---

With [Continuous Delivery](https://en.wikipedia.org/wiki/Continuous_delivery), you want to ensure all automated tests pass prior to deploying the code to a Dev or Test environment. If your code is already deploying to AWS, e.g. [EC2](https://aws.amazon.com/ec2/) or [Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/), then a great option is to keep everything in-house and build your code with [AWS CodeBuild](https://aws.amazon.com/codebuild/).

This post will walk you through setting up a [Ruby on Rails](https://rubyonrails.org/) _CodeBuild_ project which runs a suite of [RSpec](http://rspec.info/) tests.

## 1) Create a Docker Image for the Build Environment

You want to ensure that the build environment matches the environment where the code is deployed to. _CodeBuild_ provides images for various Ruby environments:

![Codebuild Default Images](/assets/images/blog/2018/08/29/codebuild-images.png)

But most likely these will not match your environment completely. For example, you might be using Ruby 2.4.0. We can customize one of these images-- changing the ruby version to match our environment and installing [PostgreSQL](https://www.postgresql.org/)-- by cloning the AWS Github repo where the image definitions, i.e. Dockerfiles, are stored:

```shell
git clone https://github.com/aws/aws-codebuild-docker-images.git
```

Then updating one of the Ruby image definitions to match the build environment. I choose to update `ubuntu/ruby/2.5.1/Dockerfile`, changing the _Ruby_ version to _2.4.0_ and installing _Postgres_:

```shell
ENV RUBY_MAJOR="2.4" \
    RUBY_VERSION="2.4.0" \
    RUBY_DOWNLOAD_SHA256="152fd0bd15a90b4a18213448f485d4b53e9f7662e1508190aa5b702446b29e3d" \
    RUBYGEMS_VERSION="2.7.2" \
    BUNDLER_VERSION="1.16.1" \
    GEM_HOME="/usr/local/bundle"

# Download and install Postgres
RUN set -ex \
    && sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list' \
    && wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add - \
    && apt-get update -qq && apt-get install -y postgresql-9.4
```

You can then build your modified AWS CodeBuild Docker Image locally by running:

```shell
# cd into dir if not already there
cd aws-codebuild-docker-images/ubuntu/ruby/2.5.1
docker build -t my-codebuild-image .
```

[Here is the complete customized image described above.](https://gist.github.com/jonmbake/ad7d5255ee7141d400da09c5d8e531ae)

## 2) Deploy the Custom Image to AWS ECR

[AWS ECR](https://aws.amazon.com/ecr/) is the place to store your custom built image on AWS. Assuming the [AWS CLI](https://aws.amazon.com) is installed you can run the following commands:

```shell
# create ECR repo, which will return repositoryUri
aws ecr create-repository --repository-name codebuild-images
# tag docker image with the repository URI
docker tag my-codebuild-imag aws_account_id.dkr.ecr.us-east-1.amazonaws.com/codebuild-images
# login to ECR
aws ecr get-login --no-include-email
# push image to ECR
docker push aws_account_id.dkr.ecr.us-east-1.amazonaws.com/codebuild-images
```

This [Docker Basics for Amazon ECR Guide](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html#docker-basics-create-image) is a great resource for this step.

## 3) Set up CodeBuild Using the Custom Image

After uploading the custom image to _ECR_, when creating a new _CodeBuild_ project, your custom image will be selectable under the _Environment_ section:

![Selecting Custom Image](/assets/images/blog/2018/08/29/select-image-codebuild.png)


## 4) Add buildspec.yml to the Code Source

The _buildspec.yml_ file describes how _CodeBuild_ should perform the build. For a Ruby on Rails app using a _Postgres_ data source and _RSpec_, it should look something like:

```yaml
version: 0.1

phases:
  install:
    commands:
      - echo Starting postgresql...
      - service postgresql restart
      - echo Installing Bundler...
      - gem install bundler
      - bundle install --with test
  pre_build:
    commands:
      - echo Preparing database to run tests...
      - cp config/database.yml.example config/database.yml
      - RAILS_ENV=test bundle exec rake db:setup
      - RAILS_ENV=test bundle exec rake db:migrate
  build:
    commands:
      - echo Running rspec tests...
      - bundle exec rspec spec/
```

Commit it to your source repository on the branch that is being built.

## 5) Verify the build succeeds!

After adding _buildspec.yml_ and saving the _CodeDeploy_ project settings with the custom image, you should be able to run a build which checks out the source and verifies all the RSpec tests pass:

![Successful Build](/assets/images/blog/2018/08/29/build-success.png)

## A Tip for Debugging buildspec.yml

If you are debugging your _buildspec.yml_ or test setup, it can be faster and easier to run the image locally, mounting the source code volume (instead of constantly pushing an update to the source repository and running a build within _CodeBuild_). To do this, you can use commands like:

```shell
# run the image locally, making the source repo available within the running image
docker run -v /Users/jonbake/Code/git/my-code-repo:/home/my-code-repo -it --entrypoint sh my-codebuild-image -c bash
# within image cd into mounted directory and run build spec steps to verify they succeed
cd /home/my-code-repo
service postgresql restart
# ...
```

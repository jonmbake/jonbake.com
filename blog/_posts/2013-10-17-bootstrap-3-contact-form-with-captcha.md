---
layout: default
title: "Bootstrap 3 Contact Form with Captcha"
tags:
  - software_dev
  - walkthroughs
---

**There has been a follow-up to this post.  Check it out! [A Better Contact Form](/blog/2015/03/22/a-better-contact-form.html)**

Providing visitors to your site with an easy and quick way to provide feedback is a really good idea. A contact form at the bottom of your website can do just that. Today we are going to be building a contact form for a website using Bootstrap 3 as the front-end framework. The contact form will take a name, e-mail address, message from the user, and when the user hits the submit button, the message will be delivered to our e-mail address.  Sounds pretty cool?  Let’s get started.

The technologies we will use (besides Bootstrap) will be:

1.  **JQuery** We will use JQuery to do some simple client side validation, show error messages, and submit the message via ajax.
2.  **PHP** We will use PHP’s mail function to send the message and to generate the response and do really simple “server-side” validation.
3.  **SecureImage** We will use SecureImage Captcha to protect our contact form from being hit with spam.  Captcha, which stand for “Completely Automated Public Turing test to tell Computers and Humans Apart” are those distorted images with text that you often see on html forms.

The end result will look something like:

![contact_form_end](/assets/images/blog/2013/10/17/contact_form_end.png)

Let’s start with the HTML:

```
<div id="contact_form" class="row">
  <div class="col-12 col-sm-12 col-lg-12">
    <h2>Tell Us What You Think...</h2>
    <p>We appreciate any feedback about your overall experience on our site or how to make it even better.  Please fill in the below form with any comments and we will get back to you.</p>
    <form role="form" id="feedbackForm">
      <div class="form-group">
        <input type="text" class="form-control" id="name" name="name" placeholder="Name">
        <span class="help-block" style="display: none;">Please enter your name.</span>
      </div>
      <div class="form-group">
        <input type="email" class="form-control" id="email" name="email" placeholder="Email Address">
        <span class="help-block" style="display: none;">Please enter a valid e-mail address.</span>
      </div>
      <div class="form-group">
        <textarea rows="10" cols="100" class="form-control" id="message" name="message" placeholder="Message"></textarea>
        <span class="help-block" style="display: none;">Please enter a message.</span>
      </div>
      <img id="captcha" src="library/vender/securimage/securimage_show.php" alt="CAPTCHA Image" />
      <a href="#" onclick="document.getElementById('captcha').src = 'library/vender/securimage/securimage_show.php?' + Math.random(); return false" class="btn btn-info btn-sm">Show a Different Image</a><br/>
      <div class="form-group" style="margin-top: 10px;">
        <input type="text" class="form-control" name="captcha_code" id="captcha_code" placeholder="For security, please enter the code displayed in the box." />
        <span class="help-block" style="display: none;">Please enter the code displayed within the image.</span>
      </div>

      <span class="help-block" style="display: none;">Please enter a the security code.</span>
      <button type="submit" id="feedbackSubmit" class="btn btn-primary btn-lg" style="display: block; margin-top: 10px;">Send Feedback</button>
    </form>
  </div><!--/span-->
</div><!--/row-->
```

Bootstrap provides some really great style out of the box.  All we have to do is add a few css classes and wrap our inputs within a form-group div and we are off and running.  You will notice that there are error spans (the ones with .help-block classes, directly under the inputs) that are set to be not visible.  Client side validation, which we will go over next will make these visible in the event of an error.

Our javascript code looks something like:

```
(document).ready(function() {
  $("#feedbackSubmit").click(function() {
    //clear any errors
    contactForm.clearErrors();

    //do a little client-side validation -- check that each field has a value and e-mail field is in proper format
    var hasErrors = false;
    $('#feedbackForm input,textarea').each(function() {
      if (!$(this).val()) {
        hasErrors = true;
        contactForm.addError($(this));
      }
    });
    var $email = $('#email');
    if (!contactForm.isValidEmail($email.val())) {
      hasErrors = true;
      contactForm.addError($email);
    }

    //if there are any errors return without sending e-mail
    if (hasErrors) {
      return false;
    }

    //send the feedback e-mail
    $.ajax({
      type: "POST",
      url: "library/sendmail.php",
      data: $("#feedbackForm").serialize(),
      success: function(data)
      {
        contactForm.addAjaxMessage(data.message, false);
        //get new Captcha on success
        $('#captcha').attr('src', 'library/vender/securimage/securimage_show.php?' + Math.random());
      },
      error: function(response)
      {
        contactForm.addAjaxMessage(response.responseJSON.message, true);
      }
   });
    return false;
  });
});

//namespace as not to pollute global namespace
var contactForm = {
  isValidEmail: function (email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  },
  clearErrors: function () {
    $('#emailAlert').remove();
    $('#feedbackForm .help-block').hide();
    $('#feedbackForm .form-group').removeClass('has-error');
  },
  addError: function ($input) {
    $input.siblings('.help-block').show();
    $input.parent('.form-group').addClass('has-error');
  },
  addAjaxMessage: function(msg, isError) {
    $("#feedbackSubmit").after('<div id="emailAlert" class="alert alert-' + (isError ? 'danger' : 'success') + '" style="margin-top: 5px;">' + $('<div/>').text(msg).html() + '</div>');
  }
};
```

Walking through this code… When the form submit button is clicked, we first clear any prior errors that might be visible within the form. As you can see from the screenshot above, any error or success message from the server is shown below the submit button.  To produce our client side errors we add a ‘has-error’ class to the from-group, which makes it show in red and make the errors spans visible for any field in error;  any of these things must also be reverted.

After we clear any previous errors, we check for new errors for the newly submitted data.  You can see lines 7-9 check that a value has been filled in and lines 14-18 checks the email address entered via a regular expression.  If there are any errors, the function returns.  If there are no errors, we use $.ajax to submit our contact form data via ajax to our PHP script.

The PHP script to send the e-mail:

```
<?php
  //start a session -- needed for Securimage Captcha check
  session_start();

  //add you e-mail address here
  define("MY_EMAIL", "myemail@foo.com");

  /**
   * Sets error header and json error message response.
   *
   * @param  String $messsage error message of response
   * @return void
   */
  function errorResponse ($messsage) {
    header('HTTP/1.1 500 Internal Server Error');
    die(json_encode(array('message' => $messsage)));
  }

  /**
   * Return a formatted message body of the form:
   * Name: <name of submitter>
   * Comment: <message/comment submitted by user>
   *
   * @param String $name     name of submitter
   * @param String $message message/comment submitted
   */
  function setMessageBody ($name, $message) {
    $message_body = "Name: " . $name."\n\n";
    $message_body .= "Comment:\n" . nl2br($message);
    return $message_body;
  }

  $email = $_POST['email'];
  $message = $_POST['message'];

  header('Content-type: application/json');
  //do some simple validation. this should have been validated on the client-side also
  if (empty($email) || empty($message)) {
    errorResponse('Email or message is empty.');
  }

  //do Captcha check, make sure the submitter is not a robot:)...
  include_once './vender/securimage/securimage.php';
  $securimage = new Securimage();
  if (!$securimage->check($_POST['captcha_code'])) {
    errorResponse('Invalid Security Code');
  }

  //try to send the message
  if(mail(MY_EMAIL, "Feedback Form Results", setMessageBody($_POST["name"], $message), "From: $email")) {
    echo json_encode(array('message' => 'Your message was successfully submitted.'));
  } else {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(array('message' => 'Unexpected error while attempting to send e-mail.'));
  }
?>
```

**To get this to work with your website, you must change the MY_EMAIL constant’s value defined at the top to your e-mail.**  That is of course unless your e-mail address is really _myemail@foo.com_ in which case you can leave it alone:).  There are a couple of functions defined at the top to generate an error response and set the message body of the e-mail.  Again, we do some simple validation to make sure an e-mail and message had been submitted.  We also check the Captcha to make sure the code entered matches the image.  If it does not, we respond with an error and the message is not sent.  Finally, we attempt to send the message. If it passes validation, the final result is an email in your inbox!

Demo: [Contact Form Demo](http://jonmbake.github.io/bootstrap3-contact-form/)  
Source code is available at: [Bootstrap 3 Contact Form with Captcha](https://github.com/jonmbake/bootstrap3-contact-form)

**There has been a follow-up to this post.  Check it out! [A Better Contact Form](/blog/2015/03/22/a-better-contact-form.html)**

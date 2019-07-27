(function () {
    const loaded = new Date().getTime();
    var contactFormUtils = {
        isValidEmail: function (email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        },
        clearErrors: function () {
            $('#emailAlert').remove();
            $('#feedbackForm .help-block').hide();
            $('#feedbackForm .form-group').removeClass('has-error');
        },
        clearForm: function () {
            $('#feedbackForm input,textarea').val("");
        },
        addError: function ($input) {
            var parentFormGroup = $input.parents('.form-group');
            parentFormGroup.children('.help-block').show();
            parentFormGroup.addClass('has-error');
        }
    };

    $(document).ready(function() {
        $("#feedbackSubmit").click(function() {
            var $btn = $(this);
            $btn.prop("disabled",true);
            contactFormUtils.clearErrors();

            var $form = $("#feedbackForm"), hasErrors = false;
            if (new Date().getTime() - loaded < 5000) {
              hasErrors = true;
            }
            $('#feedbackForm input,#feedbackForm textarea').not('.optional').each(function() {
                var $this = $(this);
                if (($this.is(':checkbox') && !$this.is(':checked')) || !$this.val()) {
                    hasErrors = true;
                    contactFormUtils.addError($(this));
                }
            });
            var $email = $('#email');
            if (!contactFormUtils.isValidEmail($email.val())) {
                hasErrors = true;
                contactFormUtils.addError($email);
            }
            if (hasErrors) {
                $btn.prop("disabled", false);
                return false;
            }

            $.ajax({
              url: 'https://godkqerucg.execute-api.us-east-1.amazonaws.com/Prod/feedback/',
              dataType: 'json',
              type: 'post',
              contentType: 'application/json',
              data: $form.serializeArray().reduce(function(p, c) {
                p[c.name] = c.value;
                return p;
              }, {}),
              success: function() {
                $('#feedback-alert').removeClass('no-show alert-error').addClass('alert-success').text('Successfully submitted!');
              },
              error: function() {
                $btn.prop("disabled", false);
                $('#feedback-alert').removeClass('no-show alert-success').addClass('alert-error').text('Unexpected error while submitting feedback. Please try again later.');
              }
            });
            return false;
        });
    });
})();

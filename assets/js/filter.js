$(document).ready(function() {
  const TOPICS = [
    {className: 'business', text: 'Business'},
    {className: 'funny', text: 'Funny'},
    {className: 'java', text: 'Java'},
    {className: 'javascript', text: 'JavaScript'},
    {className: 'medium', text: 'Medium'},
    {className: 'personal_dev', text: 'Personal Dev'},
    {className: 'security', text: 'Web Security'},
    {className: 'software_dev', text: 'Software Dev'},
    {className: 'sql', text: 'SQL'},
    {className: 'walkthroughs', text: 'Walk Throughs'},
  ];

  const POST_SELECTOR = '.post';

  const buttons = TOPICS.map((t, i) => {
    const selector = $(POST_SELECTOR + '.' + t.className);
    const $b = $('<button class="filter-btn pure-button" data-classname=".post.' + t.className + '"><i class="filter-icon fa fa-circle-o"></i> ' + t.text + ' (' + selector.length + 'X)</button>');
    $b.on('click', function() {
      if ($(this).hasClass('filter-btn-active')) {
        $(this).removeClass('filter-btn-active').find('.filter-icon').removeClass('fa-check-circle-o').addClass('fa-circle-o');
      } else {
        $(this).addClass('filter-btn-active').find('.filter-icon').removeClass('fa-circle-o').addClass('fa-check-circle-o');
        selector.show();
      }
      if ($('.filter-btn-active').length === 0) {
        $(POST_SELECTOR).show();
      } else {
        $(POST_SELECTOR).hide();
        $($('.filter-btn-active').map((i, a) => $(a).data('classname')).toArray().join(',')).show();
      }
    });
    return $b;
  })
  $('.topic-filter').append(buttons);
});

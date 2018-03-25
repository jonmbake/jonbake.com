$(document).ready(function() {
  const TOPICS = [
    {className: 'java', text: 'Java'},
    {className: 'javascript', text: 'JavaScript'},
    {className: 'medium', text: 'Medium'},
    {className: 'personal_dev', text: 'Personal Development'},
    {className: 'security', text: 'Web Security'},
    {className: 'software_dev', text: 'Software Development'},
    {className: 'sql', text: 'SQL'},
    {className: 'walkthroughs', text: 'Walk Throughs'},
  ];

  const POST_SELECTOR = '.post';

  const filter = function () {
    const selected = $('.topic-filter').select2("val");
    if (selected.length === 0) {
      $(POST_SELECTOR).show();
    } else {
      $(POST_SELECTOR).hide();
      selected.forEach(s => $(POST_SELECTOR + '.' + s).show())
    }
  }

  $('.topic-filter').select2({
    width: '50%',
    placeholder: 'Filter by Topic',
    data: TOPICS.map((t, i) => {
      return {
        id: t.className,
        text: t.text + ' (' + $(POST_SELECTOR + '.' + t.className).length + ')'
      }
    })
  }).on('change', filter);
});

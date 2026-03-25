// Founders accordion functionality
document.addEventListener('DOMContentLoaded', function() {
  const triggers = document.querySelectorAll('.founders__accordion-trigger');
  
  triggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const accordion = this.closest('.founders__accordion');
      const content = accordion.querySelector('.founders__accordion-content');
      const isOpen = content.getAttribute('data-open') === 'true';
      
      // Close all other accordions in the same card
      const card = accordion.closest('.founders__card');
      const otherAccordions = card.querySelectorAll('.founders__accordion');
      
      otherAccordions.forEach(acc => {
        const accContent = acc.querySelector('.founders__accordion-content');
        const accTrigger = acc.querySelector('.founders__accordion-trigger');
        accContent.setAttribute('data-open', 'false');
        accTrigger.setAttribute('aria-expanded', 'false');
      });
      
      // Toggle current accordion
      content.setAttribute('data-open', !isOpen);
      this.setAttribute('aria-expanded', !isOpen);
    });
  });
});

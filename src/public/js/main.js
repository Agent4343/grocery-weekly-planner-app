// NL Grocery Deals Newsletter - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
      }
    });
  }
  
  // Auto-dismiss alerts
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => {
    setTimeout(() => {
      alert.style.opacity = '0';
      setTimeout(() => alert.remove(), 300);
    }, 5000);
  });
  
  // Form validation
  const forms = document.querySelectorAll('form[data-validate]');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      let valid = true;
      const required = form.querySelectorAll('[required]');
      
      required.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      if (!valid) {
        e.preventDefault();
        alert('Please fill in all required fields.');
      }
    });
  });
  
  // Filter auto-submit
  const filterSelects = document.querySelectorAll('.filters select');
  filterSelects.forEach(select => {
    select.addEventListener('change', function() {
      this.form.submit();
    });
  });
  
  // Confirm delete actions
  const deleteButtons = document.querySelectorAll('[data-confirm]');
  deleteButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (!confirm(this.dataset.confirm || 'Are you sure?')) {
        e.preventDefault();
      }
    });
  });
  
  // Toggle featured status (admin)
  const featuredToggles = document.querySelectorAll('.toggle-featured');
  featuredToggles.forEach(toggle => {
    toggle.addEventListener('click', async function(e) {
      e.preventDefault();
      const dealId = this.dataset.dealId;
      const session = this.dataset.session;
      
      try {
        const response = await fetch(`/admin/deals/${dealId}/toggle-featured?session=${session}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await response.json();
        if (data.success) {
          this.classList.toggle('active');
          this.innerHTML = data.data.is_featured 
            ? '<i class="fas fa-star"></i>' 
            : '<i class="far fa-star"></i>';
        }
      } catch (error) {
        console.error('Error toggling featured:', error);
      }
    });
  });
  
  // Delete items (admin)
  const deleteActions = document.querySelectorAll('.delete-action');
  deleteActions.forEach(action => {
    action.addEventListener('click', async function(e) {
      e.preventDefault();
      
      if (!confirm('Are you sure you want to delete this item?')) return;
      
      const url = this.dataset.url;
      const session = this.dataset.session;
      const row = this.closest('tr') || this.closest('.card');
      
      try {
        const response = await fetch(`${url}?session=${session}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await response.json();
        if (data.success) {
          row.style.opacity = '0';
          setTimeout(() => row.remove(), 300);
        } else {
          alert('Failed to delete: ' + (data.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error deleting:', error);
        alert('Failed to delete item');
      }
    });
  });
  
  // Newsletter preview generator (admin)
  const previewBtn = document.querySelector('#generatePreview');
  if (previewBtn) {
    previewBtn.addEventListener('click', async function() {
      const selectedDeals = Array.from(document.querySelectorAll('input[name="deal_ids"]:checked'))
        .map(cb => cb.value);
      const tipId = document.querySelector('select[name="tip_id"]')?.value;
      const customIntro = document.querySelector('textarea[name="custom_intro"]')?.value;
      const session = this.dataset.session;
      
      try {
        const response = await fetch(`/admin/newsletters/generate?session=${session}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            deal_ids: selectedDeals,
            tip_id: tipId,
            custom_intro: customIntro
          })
        });
        
        const data = await response.json();
        if (data.success) {
          const previewFrame = document.querySelector('#previewFrame');
          if (previewFrame) {
            previewFrame.srcdoc = data.data.html;
          }
          
          const contentField = document.querySelector('textarea[name="content_html"]');
          if (contentField) {
            contentField.value = data.data.html;
          }
        }
      } catch (error) {
        console.error('Error generating preview:', error);
        alert('Failed to generate preview');
      }
    });
  }
  
  // Price calculator
  const regularPrice = document.querySelector('input[name="regular_price"]');
  const salePrice = document.querySelector('input[name="sale_price"]');
  const discountDisplay = document.querySelector('#discountPercent');
  
  if (regularPrice && salePrice && discountDisplay) {
    const calculateDiscount = () => {
      const reg = parseFloat(regularPrice.value) || 0;
      const sale = parseFloat(salePrice.value) || 0;
      
      if (reg > 0 && sale > 0 && reg > sale) {
        const discount = Math.round(((reg - sale) / reg) * 100);
        discountDisplay.textContent = `${discount}% off`;
        discountDisplay.style.color = '#28a745';
      } else {
        discountDisplay.textContent = '';
      }
    };
    
    regularPrice.addEventListener('input', calculateDiscount);
    salePrice.addEventListener('input', calculateDiscount);
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => {
      imageObserver.observe(img);
    });
  }
});

// Utility functions
function formatPrice(price) {
  return '$' + parseFloat(price).toFixed(2);
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Export for use in other scripts
window.NLGrocery = {
  formatPrice,
  formatDate
};

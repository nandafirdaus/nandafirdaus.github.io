document.addEventListener('DOMContentLoaded', () => {
    // Initialize task completion tracking
    const totalTasks = document.querySelectorAll('.task-item').length;
    let completedTasks = Math.floor(totalTasks / 2); // Set to 50% of total tasks
    updateProgress();

    // Task checkbox handling
    document.querySelectorAll('.task-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const taskItem = e.target.closest('.task-item');
            
            if (e.target.checked) {
                completedTasks++;
                celebrateCompletion(taskItem);
            } else {
                completedTasks--;
            }
            
            updateProgress();
        });
    });

    // Learn More buttons handling
    document.querySelectorAll('.learn-more-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = button.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
            }
        });
    });

    // Close modal handling
    document.querySelectorAll('.modal .close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.modal').classList.remove('active');
        });
    });

    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Progress update function
    function updateProgress() {
        const percentage = Math.round((completedTasks / totalTasks) * 100);
        const progressPath = document.querySelector('.circular-chart .circle-progress');
        const percentageText = document.querySelector('.percentage');
        const impactText = document.querySelector('.impact-text');
        
        // Only update progress circle if elements exist
        if (progressPath && percentageText) {
            // Calculate the circumference of the circle (2 * PI * radius)
            const radius = 16; // matches the r attribute in SVG
            const circumference = 2 * Math.PI * radius;
            const offset = ((100 - percentage) / 100) * circumference;
            progressPath.style.strokeDasharray = `${circumference} ${circumference}`;
            progressPath.style.strokeDashoffset = offset;
            percentageText.textContent = `${percentage}%`;
        }
        
        // Only update impact text if element exists
        if (impactText) {
            const remainingTasks = totalTasks - completedTasks;
            
            if (remainingTasks > 0) {
                impactText.textContent = `Complete ${remainingTasks} more ${remainingTasks === 1 ? 'item' : 'items'} to help you get your first order`;
            } else {
                impactText.textContent = 'All tasks completed! Your store is fully optimized.';
            }
        }
    }

    // Celebration animation
    function celebrateCompletion(element) {
        element.classList.add('celebrate');
        setTimeout(() => {
            element.classList.remove('celebrate');
        }, 500);
    }

    // Learning Resources Filter Functionality
    const filterChips = document.querySelectorAll('.filter-chip');
    const resourceCards = document.querySelectorAll('.resource-card');
    const categories = document.querySelectorAll('.learning-category');

    // Category mapping for filter matching
    const categoryMapping = {
        'menu management': 'menu excellence',
        'store setup': 'store setup',
        'order handling': 'order handling',
        'marketing': 'marketing'
    };

    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Remove active class from all chips
            filterChips.forEach(c => c.classList.remove('active'));
            // Add active class to clicked chip
            this.classList.add('active');

            const selectedCategory = this.textContent.toLowerCase();

            // Show all categories if "All" is selected
            if (selectedCategory === 'all') {
                categories.forEach(category => {
                    category.style.display = 'block';
                });
                return;
            }

            // Hide/show categories based on selection using mapping
            categories.forEach(category => {
                const categoryTitle = category.querySelector('h3').textContent.toLowerCase();
                const mappedCategory = categoryMapping[selectedCategory] || selectedCategory;
                
                if (categoryTitle.includes(mappedCategory)) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            });
        });
    });
}); 
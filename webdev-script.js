document.addEventListener('DOMContentLoaded', function() {
    // Get current project path
    const projectPath = window.location.pathname.split('/').slice(0, -1).join('/');
    const dataUrl = `${projectPath}/data.json`;
    
    // Load project data
    fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            // Set basic page info
            document.title = `${data.title} | Your Name`;
            document.getElementById('project-name').textContent = data.title;
            document.getElementById('project-subtitle').textContent = data.subtitle;
            document.getElementById('project-description').textContent = data.description;
            document.getElementById('main-project-image').src = data.mainImage;
            document.getElementById('main-project-image').alt = data.title;
            
            // Set hero class
            const hero = document.getElementById('dynamic-hero');
            if (data.heroClass) {
                hero.classList.add(data.heroClass);
            }
            
            // Set project details
            const detailsList = document.getElementById('project-details');
            data.details.forEach(detail => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${detail.label}:</strong> ${detail.value}`;
                detailsList.appendChild(li);
            });
            
            // Set project links
            const linksContainer = document.getElementById('project-links');
            data.links.forEach(link => {
                const a = document.createElement('a');
                a.href = link.url;
                a.className = 'btn';
                a.innerHTML = `<i class="${link.icon}"></i> ${link.text}`;
                linksContainer.appendChild(a);
            });
            
            // Build dynamic sections
            const contentContainer = document.querySelector('.project-content');
            data.sections.forEach(section => {
                const sectionElement = document.createElement('div');
                sectionElement.className = `project-${section.type}`;
                sectionElement.innerHTML = `<h2>${section.title}</h2>`;
                
                switch(section.type) {
                    case 'gallery':
                        const galleryGrid = document.createElement('div');
                        galleryGrid.className = 'gallery-grid';
                        
                        section.items.forEach(item => {
                            const itemElement = document.createElement('div');
                            itemElement.className = 'gallery-item';
                            itemElement.innerHTML = `
                                <img src="${item.image}" alt="${item.caption}">
                                <p>${item.caption}</p>
                            `;
                            galleryGrid.appendChild(itemElement);
                        });
                        
                        sectionElement.appendChild(galleryGrid);
                        break;
                        
                    case 'process':
                        const processSteps = document.createElement('div');
                        processSteps.className = 'process-steps';
                        
                        section.steps.forEach(step => {
                            const stepElement = document.createElement('div');
                            stepElement.className = 'step';
                            stepElement.innerHTML = `
                                <h3>${step.title}</h3>
                                <p>${step.description}</p>
                            `;
                            processSteps.appendChild(stepElement);
                        });
                        
                        sectionElement.appendChild(processSteps);
                        break;
                        
                    case 'challenges':
                        section.items.forEach(item => {
                            const challengeElement = document.createElement('div');
                            challengeElement.className = 'challenge';
                            challengeElement.innerHTML = `
                                <h3>${item.title}</h3>
                                <p>${item.description}</p>
                            `;
                            sectionElement.appendChild(challengeElement);
                        });
                        break;
                }
                
                contentContainer.appendChild(sectionElement);
            });
            
            // Set navigation
            if (data.navigation.prev) {
                document.getElementById('prev-project').href = data.navigation.prev;
            } else {
                document.getElementById('prev-project').style.display = 'none';
            }
            
            if (data.navigation.next) {
                document.getElementById('next-project').href = data.navigation.next;
            } else {
                document.getElementById('next-project').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error loading project data:', error);
            // Fallback content or error message
        });
});

let projects = JSON.parse(localStorage.getItem('projects')) || [];
let currentProjectId = null;

const projectsContainer = document.getElementById('projectsContainer');
const projectForm = document.getElementById('projectForm');
const donateForm = document.getElementById('donateForm');

document.getElementById('createBtn').onclick = () => projectForm.classList.remove('hidden');
document.getElementById('closeForm').onclick = () => projectForm.classList.add('hidden');
document.getElementById('closeDonate').onclick = () => donateForm.classList.add('hidden');

document.getElementById('submitProject').onclick = () => {
  const title = document.getElementById('title').value;
  const desc = document.getElementById('desc').value;
  const goal = parseInt(document.getElementById('goal').value);
  
  const newProject = { id: Date.now(), title, desc, goal, collected: 0 };
  projects.push(newProject);
  localStorage.setItem('projects', JSON.stringify(projects));
  projectForm.classList.add('hidden');
  loadProjects();
}

function loadProjects() {
  projectsContainer.innerHTML = '';
  projects.forEach(p => {
    const percent = (p.collected / p.goal) * 100;
    projectsContainer.innerHTML += `
      <div class="project-card">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <p><b>Goal:</b> Rs. ${p.goal}</p>
        <p><b>Collected:</b> Rs. ${p.collected}</p>
        <div class="progress-bar"><div class="progress" style="width:${percent}%"></div></div>
        <button onclick="openDonate(${p.id})">Donate</button>
      </div>
    `;
  });
}

function openDonate(id) {
  currentProjectId = id;
  donateForm.classList.remove('hidden');
}

document.getElementById('submitDonate').onclick = () => {
  const amount = parseInt(document.getElementById('donateAmount').value);
  projects = projects.map(p => p.id === currentProjectId ? {...p, collected: p.collected + amount} : p);
  localStorage.setItem('projects', JSON.stringify(projects));
  donateForm.classList.add('hidden');
  loadProjects();
}

loadProjects();
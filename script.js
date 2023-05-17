function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
  
    sidebar.classList.toggle('collapsed');
    content.classList.toggle('collapsed');
  }
  
const tasks = document.querySelectorAll('.task');
const columns = document.querySelectorAll('.column');

tasks.forEach(task => {
  task.addEventListener('dragstart', dragStart);
  task.addEventListener('dragend', dragEnd);
});

columns.forEach(column => {
  column.addEventListener('dragover', dragOver);
  column.addEventListener('dragenter', dragEnter);
  column.addEventListener('dragleave', dragLeave);
  column.addEventListener('drop', drop);
});

function dragStart(e) {
  this.classList.add('dragging');
  e.dataTransfer.setData('text', this.id);  
}

function dragEnd() {
  this.classList.remove('dragging');
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('drag-over');
}

function dragLeave() {
  this.classList.remove('drag-over');
}

function drop(e) {
  this.classList.remove('drag-over');
  const draggedTaskId = e.dataTransfer.getData('text');
  const draggedTask = document.getElementById(draggedTaskId);
  this.appendChild(draggedTask);  
}

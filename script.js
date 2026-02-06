class Student {
    constructor(id, fullName, dob, classRoom, gpa) {
        this.id = id;
        this.fullName = fullName;
        this.dob = dob;
        this.classRoom = classRoom;
        this.gpa = gpa;
    }
  
    updateInfo(fullName, dob, classRoom, gpa) {
        this.fullName = fullName;
        this.dob = dob;
        this.classRoom = classRoom;
        this.gpa = gpa;
    }
}

let studentList = [];

function saveStudent() {
    const id = document.getElementById('id').value;
    const fullName = document.getElementById('fullname').value;
    const dob = document.getElementById('dob').value;
    const classRoom = document.getElementById('classRoom').value;
    const gpa = document.getElementById('gpa').value;
    const editIndex = parseInt(document.getElementById('editIndex').value);

    if (!id || !fullName || !dob || !classRoom || !gpa) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (editIndex === -1) {
        const isDuplicate = studentList.some(s => s.id === id);
        if (isDuplicate) {
            alert("Mã sinh viên này đã tồn tại!");
            return;
        }

        const newStudent = new Student(id, fullName, dob, classRoom, gpa);
        studentList.push(newStudent);
    } else {
        studentList[editIndex].updateInfo(fullName, dob, classRoom, gpa);

        studentList[editIndex].id = id; 
    }

    renderTable();
    resetForm();
}

function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = "";

    studentList.forEach((student, index) => {
        const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.fullName}</td>
                <td>${student.dob}</td>
                <td>${student.classRoom}</td>
                <td>${student.gpa}</td>
                <td>
                    <button class="action-btn" onclick="editStudent(${index})">Sửa</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function editStudent(index) {
    const student = studentList[index];

    document.getElementById('id').value = student.id;
    document.getElementById('fullname').value = student.fullName;
    document.getElementById('dob').value = student.dob;
    document.getElementById('classRoom').value = student.classRoom;
    document.getElementById('gpa').value = student.gpa;

    document.getElementById('editIndex').value = index;

    document.getElementById('saveBtn').innerText = "Cập nhật";
    document.getElementById('cancelBtn').style.display = "inline-block";

    document.getElementById('id').disabled = true;
}
function resetForm() {
    document.getElementById('id').value = "";
    document.getElementById('fullname').value = "";
    document.getElementById('dob').value = "";
    document.getElementById('classRoom').value = "";
    document.getElementById('gpa').value = "";
    
    document.getElementById('editIndex').value = "-1";
    document.getElementById('saveBtn').innerText = "Thêm Sinh Viên";
    document.getElementById('cancelBtn').style.display = "none";
    document.getElementById('id').disabled = false;
}

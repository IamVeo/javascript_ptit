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
    // Lấy giá trị
    const id = document.getElementById('id').value;
    const fullName = document.getElementById('fullname').value;
    const dob = document.getElementById('dob').value;
    const classRoom = document.getElementById('classRoom').value;
    const gpa = document.getElementById('gpa').value;
    const editIndex = parseInt(document.getElementById('editIndex').value);

    // Validate
    if (!id || !fullName || !dob || !classRoom || !gpa) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (editIndex === -1) {
        // Thêm mới
        const isDuplicate = studentList.some(s => s.id === id);
        if (isDuplicate) {
            alert("Mã sinh viên này đã tồn tại!");
            return;
        }

        const newStudent = new Student(id, fullName, dob, classRoom, gpa);
        studentList.push(newStudent);
    } else {
        // Cập nhật
        studentList[editIndex].updateInfo(fullName, dob, classRoom, gpa);
        // Cập nhật ID (nếu cần thiết, dù thực tế ít khi đổi ID)
        studentList[editIndex].id = id; 
    }

    renderTable();
    resetForm();
}

function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = "";

    if (studentList.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#888;">Chưa có dữ liệu sinh viên</td></tr>`;
        return;
    }

    studentList.forEach((student, index) => {
        const row = `
            <tr>
                <td><strong>${student.id}</strong></td>
                <td>${student.fullName}</td>
                <td>${formatDate(student.dob)}</td>
                <td>${student.classRoom}</td>
                <td><span style="font-weight:bold; color: ${getColorByGPA(student.gpa)}">${student.gpa}</span></td>
                <td class="text-center">
                    <button class="action-btn" onclick="editStudent(${index})">Chỉnh sửa</button>
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

    // UI thay đổi khi edit
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.innerText = "Cập nhật thông tin";
    saveBtn.classList.remove('btn-primary');
    saveBtn.classList.add('btn-warning'); // Bạn có thể thêm class màu vàng nếu muốn
    saveBtn.style.backgroundColor = "#ed8936"; // Màu cam để phân biệt

    document.getElementById('cancelBtn').style.display = "block";
    document.getElementById('id').disabled = true;
    
    // Cuộn lên đầu trang form
    document.querySelector('.card').scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
    document.getElementById('id').value = "";
    document.getElementById('fullname').value = "";
    document.getElementById('dob').value = "";
    document.getElementById('classRoom').value = "";
    document.getElementById('gpa').value = "";
    
    document.getElementById('editIndex').value = "-1";

    const saveBtn = document.getElementById('saveBtn');
    saveBtn.innerText = "Thêm Sinh Viên";
    saveBtn.style.backgroundColor = ""; // Reset về màu class css
    
    document.getElementById('cancelBtn').style.display = "none";
    document.getElementById('id').disabled = false;
}

// Hàm phụ trợ: Format ngày cho đẹp (dd/mm/yyyy)
function formatDate(dateString) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

// Hàm phụ trợ: Màu sắc cho GPA
function getColorByGPA(gpa) {
    if (gpa >= 8.0) return "#48bb78"; // Xanh lá
    if (gpa >= 5.0) return "#d69e2e"; // Vàng
    return "#e53e3e"; // Đỏ
}

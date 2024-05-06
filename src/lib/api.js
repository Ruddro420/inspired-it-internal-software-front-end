const api_key = import.meta.env.VITE_apiKey;

const adminLogin = (email, password) => {
  return fetch(api_key + "admin_login", {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({email, password}),
  });
};

//Add Class
const classAdd = (data) => {
  return fetch(api_key + "class_add", {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ ...data }),
  });
};

//Add teachers
const teacherAdd = (data) => {
  return fetch(api_key + "teacher_add", {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ ...data }),
  });
};

const studentAdd = (data) => {
  return fetch(api_key + "student_add", {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const AdmissionFeeAdd = (data) => {
  return fetch(api_key + "admission_fee", {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const sectionAdd = (data) => {
  return fetch(api_key + "section_add", {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

//Add Settings
const settingsAdd = (data) => {
  return fetch(api_key + "settings_add", {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ ...data }),
  });
};

////___________________________________________________________________________________________________________________////////

//GET
const adminLogout = () => {
  return fetch(api_key + "admin_logout", {
    method: "GET",
    credentials: "include",
  });
};

const checkAdminLogin = () => {
  return fetch(api_key + "check_admin_login", {
    method: "GET",
    credentials: "include",
  });
};

// Classes
const getClasses = () => {
  return fetch(api_key + "classes", {
    method: "GET",
    credentials: "include",
  });
};

//teachers
const getTeachers = () => {
  return fetch(api_key + "teachers", {
    method: "GET",
    credentials: "include",
  });
};

// getStudentsCount
const getTeacherCount = () => {
  return fetch(api_key + "teacher_count", {
    method: "GET",
    credentials: "include",
  });
};

// View Students
const viewStudentsData = () => {
  return fetch(api_key + "students", {
    method: "GET",
    credentials: "include",
  });
};

//getStudents
const getStudents = () => {
  return fetch(api_key + "students", {
    method: "GET",
    credentials: "include",
  });
};

// getStudentsCount
const getStudentCount = () => {
  return fetch(api_key + "student_count", {
    method: "GET",
    credentials: "include",
  });
};

//getStudentById
const getStudentById = (id) => {
  return fetch(api_key + "student/" + id, {
    method: "GET",
    credentials: "include",
  });
};

const getSettings = () => {
  return fetch(api_key + "settings", {
    method: "GET",
    credentials: "include",
  });
};

// get image
const getImage = (folder, filename) => {
  return fetch(api_key + `image/${folder}/${filename}`, {
    method: "GET",
    credentials: "include",
  });
};



//----------------------------------------------
//UPDATE 

const studentUpdate = (data, id) => {
  return fetch(api_key + "student_update/"+id, {
    method: "PUT",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

/* Settings Update */

const settingsUpdate = (data, id) => {
  return fetch(api_key + "settings_update/"+id, {
    method: "PUT",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};


//______________________________________________________________________________//////

//DELETE
const deleteClass = (id) => {
  return fetch(api_key + "class/" + id, {
    method: "DELETE",
    credentials: "include",
  });
};

const deleteStudent = (id) => {
  return fetch(api_key + "student/" + id, {
    method: "DELETE",
    credentials: "include",
  });
};


// get Formatted DateTime
const dateTime = (date) => {
  let d = date.toString()
  d = d.split(' ')
  return d[1] + " " + d[2] + ", " + d[3]
}


// 
const fetchImageAndConvertToDataURI = async (folder, filename) => {
  const response = await fetch(api_key + 'image/'+ `${folder}/${filename}`, {credentials: "include"});
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

export {
  adminLogin,
  adminLogout,
  checkAdminLogin,
  classAdd,
  teacherAdd,
  studentAdd,
  studentUpdate,
  sectionAdd,
  viewStudentsData,
  getClasses,
  deleteClass,
  getTeachers,
  getTeacherCount,
  getStudentById,
  getStudents,
  getStudentCount,
  deleteStudent,
  dateTime, 
  AdmissionFeeAdd,
  settingsAdd,
  getSettings,
  settingsUpdate,
  getImage,
  fetchImageAndConvertToDataURI
};

const api_key = import.meta.env.VITE_apiKey;

const adminLogin = (email, password) => {
  return fetch(api_key + "admin_login", {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(email, password),
  });
};

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
/* View Students */
const viewStudentsData = () => {
  return fetch(api_key + "students", {
    method: "GET",
    credentials: "include",
  });
};

export { adminLogin, adminLogout, checkAdminLogin, teacherAdd, studentAdd,viewStudentsData };

'use strict';

import employeeStore from "../models/employee-store.js";

const about = {
  createView(req, res) {
    const employee = employeeStore.getAppInfo();
    res.render("about", { title: "About", id: "about", employee });
  },
};

export default about;

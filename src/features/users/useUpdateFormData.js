export const useUpdateFormData=(_id,firstName,lastName,email,employeeId,designation,teamLead,reportingManager,file, address, gender, bloodGroup, phone, dob)=>{
    const formData = new FormData();
    formData.append('_id',_id);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('employeeId', employeeId);
    formData.append('designation', designation);
    formData.append('teamLead',teamLead);
    formData.append('reportingManager',reportingManager);
    formData.append('file', file);
    formData.append('address',address);
    formData.append('gender',gender);
    formData.append('bloodGroup',bloodGroup);
    formData.append('phone',phone);
    formData.append('dob',dob);
    return formData;
}
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { HiXCircle } from "react-icons/hi";
import useSignup from "../features/authentication/useSignup";
import { useState } from "react";
import { useFormData } from "../features/users/useFormData";


const CreateNewUser = ({ isModalOpen, setIsModalOpen }) => {
  const [file, setFile] = useState();
  const bloodGroups=['A+','A-','B+','B-','O+','O-','AB+','AB-'];
  const { Option } = Select;
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { signup, isPending } = useSignup();

  const onFinish = (values) => {
    const { firstName, lastName, email, password, passwordConfirm, employeeId, designation, teamLead, reportingManager,address,gender,bloodGroup,phone,dob } = values;
    const form = useFormData(firstName, lastName, email, password, passwordConfirm, employeeId, designation, teamLead, reportingManager, file, address, gender, bloodGroup, phone, dob);
    signup(form, {
      onSettled: () => {
        handleCancel();
      },
    });
  };

  return (
    <div className="">
      <Modal
        width={700}
        title="Create new user"
        open={isModalOpen}
        closeIcon={<HiXCircle size={25} onClick={handleCancel} />}
        footer={false}
      >
        <Form
          name="myForm"
          onFinish={onFinish}
          layout="vertical"
          className="flex flex-col"
          encType="multipart/form-data"
        >
          {/* section of firstName and lastName */}
          <div className="flex flex-wrap gap-x-4">
            <Form.Item
              label="First Name"
              name="firstName"
              className="flex-1"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              className="flex-1"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </div>

          {/* Individual email section or div */}
          <div className="flex flex-wrap gap-x-4">
            <Form.Item
              label="Email"
              name="email"
              className="flex-1"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email address" },
              ]}
            >
              <Input placeholder="Email" type="email" />
            </Form.Item>
            {/* Add Upload Component for Image */}
            <Form.Item
              label="Upload Image"
              name="file"
              value={file}
              className="flex-1"
              extra="Upload employee profile image"
              rules={[
                { required: true, message: 'Please upload an image' },
              ]}
            >
              <input type="file" accept=".png,.jpg,.jpeg" value={file} name="file" onChange={(e) => setFile(e.target.files[0])} />
            </Form.Item>

          </div>


          {/* address and blood group and gender section or div */}
          <div className="flex flex-wrap gap-x-4">
          <Form.Item
              label="Address"
              name="address"
              className="flex-1"
              rules={[{ required: true, message: "Please enter employee address" }]}
            >
              <Input placeholder="Address" type="text" />
            </Form.Item>

            <Form.Item
              label="Blood Group"
              name="bloodGroup"
              className="flex-1"
              rules={[{ required: true, message: "Please select blood group" }]}
            >
              <Select >
                {
                 bloodGroups.map((bld,index)=>(
                   <Option key={index} value={`${bld}`}>{bld}</Option>
                 ))
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              className="flex-1"
              rules={[{ required: true, message: "Please select the gender" }]}
            >
              <Select >
                   <Option value="Male">Male</Option>
                   <Option value="Female">Female</Option>
                   <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </div>


         {/* phone number and date of birth */}
          <div className="flex flex-wrap gap-x-4">
          <Form.Item
              label="Contact Number"
              name="phone"
              className="flex-1"
              rules={[{ required: true, message: "Please enter employee contact number" }]}
            >
              <Input placeholder="Phone Number" type="number" minLength={10} maxLength={10} />
            </Form.Item>

            <Form.Item
              label="Date of Birth"
              name="dob"
              className="flex-1"
              rules={[{ required: true, message: "Please enter employee date of birth" }]}
            >
              <Input placeholder="Date of Birth" type="Date"  />
            </Form.Item>
          </div>

          {/* password and confirm password section or div */}
          <div className="flex flex-wrap gap-x-4">
            <Form.Item
              label="Password"
              name="password"
              className="flex-1"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input placeholder="Password" type="password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="passwordConfirm"
              className="flex-1"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match")
                    );
                  },
                }),
              ]}
            >
              <Input placeholder="Confirm Password" type="password" />
            </Form.Item>
          </div>


          {/* employee id and designation section or div */}
          <div className="flex flex-wrap gap-x-4">
            <Form.Item label="Employee Id" name="employeeId" className="flex-1">
              <Input placeholder="Employee ID" type="number" />
            </Form.Item>
            <Form.Item label="Designation" name="designation" className="flex-1">
              <Input placeholder="Designation" type="text" />
            </Form.Item>
          </div>


          {/* Reporting manager and Team Lead section or div */}
          <div className="flex flex-wrap gap-x-4">
            <Form.Item
              label="Reporting Manager"
              name="reportingManager"
              className="flex-1"
            >
              <Select defaultValue="Select">
                <Option value="Shubham Kale">Shubham Kale</Option>
                <Option value="Pankaj Khandare">Pankaj Khandare</Option>
                <Option value="Govind Rathod">Govind Rathod</Option>
                <Option value="Nilam Rathod">Nilam Rathod</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Team Lead" name="teamLead" className="flex-1">
              <Select defaultValue="Select">
                <Option value="Shubham Kale">Shubham Kale</Option>
                <Option value="Pankaj Khandare">Pankaj Khandare</Option>
                <Option value="Govind Rathod">Govind Rathod</Option>
                <Option value="Nilam Rathod">Nilam Rathod</Option>
              </Select>
            </Form.Item>
          </div>



          <Form.Item>
            <Button
              type="primary"
              className="bg-slate-600 hover:bg-slate-500"
              htmlType="submit"
              loading={isPending}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateNewUser;

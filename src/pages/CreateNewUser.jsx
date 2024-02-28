import { Button, Form, Input, Modal, Select } from "antd";
import { HiXCircle } from "react-icons/hi";
import useSignup from "../features/authentication/useSignup";

const CreateNewUser = ({ isModalOpen, setIsModalOpen }) => {
  const { Option } = Select;
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { signup, isPending } = useSignup();

  const onFinish = (values) => {
    signup(values, {
      onSettled: () => {
        handleCancel();
      },
    });
  };
  return (
    <div className="">
      <Modal
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
        >
          <div className="flex gap-x-4">
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

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input placeholder="Email" type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="passwordConfirm"
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
          <Form.Item label="Employee Id" name="employeeId" className="flex-1">
            <Input placeholder="Employee ID" type="number" />
          </Form.Item>
          <Form.Item label="Designation" name="designation" className="flex-1">
            <Input placeholder="Designation" type="text" />
          </Form.Item>
          <div className="flex gap-x-4">
            <Form.Item
              label="Reporting Manager"
              name="reportingManager"
              className="flex-1"
            >
              <Select defaultValue="Shubham Kale">
                <Option value="Shubham Kale">Shubham Kale</Option>
                <Option value="Pankaj Khandare">Pankaj Khandare</Option>
                <Option value="Govind Rathod">Govind Rathod</Option>
                <Option value="Nilam Rathod">Nilam Rathod</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Team Lead" name="teamLead" className="flex-1">
              <Select defaultValue="Shubham Kale">
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

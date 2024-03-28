import { Button, Form, Input, Select } from 'antd';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import useGetCurrentUser from '../features/users/useGetCurrentUser';

import useUpdate from '../features/authentication/useUpdate';
import { useUpdateFormData } from '../features/users/useUpdateFormData';

const UpdateUserForm = () => {
    const [file,setFile]=useState();
    const { userId } = useParams();
    const {update,isPending}=useUpdate();
    const {user}=useGetCurrentUser(userId);
    let userObject=user?.data.user;
    userObject={...userObject,dob: userObject?.dob ? new Date(userObject.dob).toLocaleDateString('en-CA').replace(/\//g, '-') : null}
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
    const onFinish = (values) => {
           if(file){
            
            const { _id,firstName, lastName, email, employeeId, designation, teamLead, reportingManager,address,gender,bloodGroup,phone,dob } = values;
            const form = useUpdateFormData(_id,firstName, lastName, email,employeeId, designation, teamLead, reportingManager, file, address, gender, bloodGroup, phone, dob);
            update(form); 
           }else{
            update(values);
           }    
    }
    return (
        <div className='flex justify-center items-center py-4'>
            <div className='px-4 py-4 bg-white w-[75%] border rounded-xl'>
                <h4 className='text-center pb-4 font-bold text-yellow-300 text-2xl'>Update Employee Data</h4>
                <Form
                    name="myForm"
                    onFinish={onFinish}
                    layout="vertical"
                    className="flex flex-col"
                    encType="multipart/form-data"
                    initialValues={userObject}
                >
                    {/* hidden form field */}
                    <Form.Item
                            hidden={true}
                            name="_id"
                            className="flex-1"
                        >
                            <Input type='hidden' />
                        </Form.Item>
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
                            // rules={[
                            //     { required: true, message: 'Please upload an image' },
                            // ]}
                        >
                            <input type="file" accept=".png,.jpg,.jpeg" name="file" onChange={(e) => setFile(e.target.files[0])} />
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
                                    bloodGroups.map((bld, index) => (
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
                            <Input placeholder="Date of Birth" type="Date" />
                        </Form.Item>
                    </div>

                    {/* password and confirm password section or div
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
                    </div> */}


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
                            type="outline"
                            className="bg-yellow-600 hover:bg-yellow-500 text-white"
                            htmlType="submit"
                            loading={isPending}
                        >
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default UpdateUserForm
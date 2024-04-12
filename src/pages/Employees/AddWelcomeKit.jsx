import React, { useState } from 'react';
import { Button, Form, Input, Modal, DatePicker, Space } from 'antd';
import { HiXCircle } from 'react-icons/hi';
import useGetCurrentUser from '../../features/users/useGetCurrentUser';
import getUserIdRole from '../../utils/getUserIdRole';
import { format } from 'date-fns';

const AddWelcomeKit = ({ isModalOpen, setIsModalOpen }) => {
    const [assignDate, setAssignedDate] = useState(null); // Initialize assignDate to null
    const { id } = getUserIdRole();
    const { user, isPending } = useGetCurrentUser(id);
    const name = `${user?.data?.user?.firstName} ${user?.data?.user?.lastName}`;

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        values.assignDate = format(new Date(assignDate), 'yyyy-MM-dd');
        values.assignBy = name;
        console.log(values);
        handleCancel();
    };

    return (
        <div>
            {!isPending && (
                <Modal
                    width={400}
                    open={isModalOpen} // Changed 'open' to 'visible'
                    closeIcon={<HiXCircle size={25} onClick={handleCancel} />}
                    footer={false}
                >
                    <Form
                        name="myForm"
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <div className="flex flex-wrap gap-x-4">
                            <Form.Item
                                label="Accessory Name"
                                name="accessoryName"
                                className="flex-1"
                                rules={[
                                    { required: true, message: 'Please enter the accessory name' },
                                ]}
                            >
                                <Input placeholder="Accessory Name" />
                            </Form.Item>
                        </div>

                        <div className="flex flex-wrap gap-x-4">
                            <Form.Item
                                label="Accessory Company Name"
                                name="accessoryCompany"
                                className="flex-1"
                            >
                                <Input placeholder="Accessory Company Name" />
                            </Form.Item>
                        </div>

                        <div className="flex flex-wrap gap-x-4">
                            <Form.Item
                                label="Accessory Id"
                                name="accessoryId"
                                className="flex-1"
                            >
                                <Input placeholder="Accessory Id if available" />
                            </Form.Item>
                        </div>

                        <div className="flex flex-wrap gap-x-4">
                            <Form.Item
                                label="Assigned Date"
                                className="flex-1"
                            >
                                <Space direction="vertical">
                                    <DatePicker value={assignDate} onChange={(date, dateString) => setAssignedDate(dateString)} /> {/* Corrected onChange */}
                                </Space>
                            </Form.Item>

                        </div>

                        <Form.Item>
                            <Button
                                type="primary"
                                className="bg-blue-600"
                                htmlType="submit"
                            >
                                Provide Kit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </div>
    );
};

export default AddWelcomeKit;

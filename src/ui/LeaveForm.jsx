import { Button, Checkbox, Form, Input, Select } from "antd";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import getUserIdRole from "../utils/getUserIdRole";
import useCreateLeaveRequest from "../features/leaves/useCreateLeaveRequest";
import FormItem from "antd/es/form/FormItem";

const LeaveForm = () => {
  const floaterDays = [
    "29-Mar-24/Good Friday",
    "9-Apr-24/Gudi Padawa",
    "11-Apr-24/Ramzan",
    "29-Oct-24/Dhanteras",
  ];
  const { data, createRequest, isPending } = useCreateLeaveRequest();
  const { id: userId } = getUserIdRole();
  const { TextArea } = Input;
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [selectedLeaveType, setSelectedLeaveType] = useState(""); // State to track selected leave type

  const onFinish = (values) => {
    const { startDate, endDate } = dateRange;
    const leaveStart = startDate.toISOString();
    const leaveEnd = endDate.toISOString();
    const data = { userId, leaveStart, leaveEnd, ...values };
    console.log(data);
    createRequest(data);
  };

  const handleLeaveTypeChange = (value) => {
    setSelectedLeaveType(value); // Update selected leave type
  };

  return (
    <div className="mt-12">
      <h1 className="p-4 mt-3">Vionsys Leave Request Form</h1>
      <p>Incase of one day leave just select start date</p>
      <div title="leave Form" visible={true} footer={false}>
        <div className="Date_Picker">
          <DateRangePicker
            ranges={[dateRange]}
            onChange={(ranges) => setDateRange(ranges.selection)}
            minDate={new Date()}
          />
        </div>
        <Form
          name="myForm"
          onFinish={onFinish}
          layout="vertical"
          className="flex flex-col"
          encType="multipart/form-data"
        >
          <div className="flex justify-between gap-8">
            {selectedLeaveType !== "Floater Leave" && (
              <Form.Item
                label="Enter Leave Days"
                name="leaveDays"
                className="w-full"
                rules={[
                  { required: true, message: "Please enter total Leave Days" },
                ]}
              >
                <Input
                  placeholder="Leave Days"
                  type="number"
                  defaultValue={1}
                />
              </Form.Item>
            )}
            <Form.Item
              label="Leave Mode"
              name="halfDay"
              valuePropName="checked"
              className="w-full"
            >
              <Checkbox>Half Day</Checkbox>
            </Form.Item>

            <Form.Item
              label="Select Leave Type"
              name="leaveType"
              className="w-full"
              rules={[
                { required: true, message: "Please select Leave Reason " },
              ]}
            >
              <Select onChange={handleLeaveTypeChange} placeholder="Leave Type">
                <Select.Option value="Sick Leave">Sick Leave</Select.Option>
                <Select.Option value="Casual Leave">Casual Leave</Select.Option>
                <Select.Option value="Floater Leave">
                  Floater Leave
                </Select.Option>
                <Select.Option value="Privilage Leave">
                  Privilage Leave
                </Select.Option>
                <Select.Option value="Unpaid Leave">Unpaid Leave</Select.Option>
              </Select>
            </Form.Item>

            {selectedLeaveType === "Floater Leave" && (
              <Form.Item
                label="Select Floater Date"
                name="floaterDay"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: "Please Select Floater Leave Date ",
                  },
                ]}
              >
                <Select>
                  {" "}
                  {floaterDays.map((days) => {
                    return <Select.Option value={days}>{days}</Select.Option>;
                  })}
                </Select>
              </Form.Item>
            )}
          </div>
          <Form.Item
            label="reason"
            name="leaveReason"
            rules={[{ required: true, message: "Please enter Leave reason" }]}
          >
            <TextArea rows={4} placeholder="reason for leave request" />
          </Form.Item>

          <Form.Item>
            <Button
              disabled={isPending}
              type="primary"
              className="bg-slate-600 hover:bg-slate-500"
              htmlType="submit"
            >
              Apply for leave
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LeaveForm;

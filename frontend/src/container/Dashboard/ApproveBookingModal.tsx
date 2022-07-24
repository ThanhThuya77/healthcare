import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import { Form, Modal, Radio, Space } from 'antd';

interface IProps {
  open: boolean;
  setOpenModal: (value: boolean) => void;
}

const ApproveBookingModal = ({ open, setOpenModal }: IProps) => {
  const [selectedDate, setSelectedDate] = useState(1);

  const [form] = Form.useForm();

  const onChangeRadio = (date: any) => {
    setSelectedDate(date);
    console.log('handleCreateBooking', date);
  };
  const handleApproveBooking = (data: any) => {
    console.log('handleApproveBooking', data);
  };

  return (
    <Modal
      title="Approve a booking"
      visible={open}
      onOk={form.submit}
      onCancel={() => {
        setOpenModal(false);
        form.resetFields({} as any);
      }}
      okText="Approve"
    >
      <Form
        labelCol={{ span: 6 }}
        layout="horizontal"
        labelAlign="left"
        form={form}
        onFinish={handleApproveBooking}
      >
        <Form.Item
          label="Proposed Dates"
          name="proposedDate"
          rules={[{ required: true, message: 'Please select proposed date!' }]}
          style={{ flexDirection: 'column' }}
          labelCol={{ span: 10 }}
        >
          <Radio.Group
            onChange={onChangeRadio}
            value={selectedDate}
            style={{ paddingLeft: 30 }}
          >
            <Space direction="vertical">
              <Radio value={1}>Option A</Radio>
              <Radio value={2}>Option B</Radio>
              <Radio value={3}>Option C</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ApproveBookingModal;

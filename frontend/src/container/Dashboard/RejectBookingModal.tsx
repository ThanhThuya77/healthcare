import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import { Col, DatePicker, Form, Input, Modal, Row, Select, Space } from 'antd';

const { TextArea } = Input;

interface IProposedDates {
  [key: string]: Moment;
}

interface IProps {
  open: boolean;
  setOpenModal: (value: boolean) => void;
}

const RejectBookingModal = ({ open, setOpenModal }: IProps) => {
  const [form] = Form.useForm();

  const handleRejectBooking = (text: string) => {
    console.log('handleRejectBooking');
  };

  return (
    <Modal
      title="Reject this booking"
      visible={open}
      onOk={form.submit}
      onCancel={() => {
        setOpenModal(false);
      }}
      okText="Reject"
    >
      <Form
        labelCol={{ span: 6 }}
        layout="horizontal"
        labelAlign="left"
        form={form}
        onFinish={handleRejectBooking}
      >
        <Form.Item
          label="Reason for Rejection"
          name="reason"
          rules={[{ required: true, message: 'Please enter the reason!' }]}
          style={{ flexDirection: 'column' }}
          labelCol={{ span: 8 }}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RejectBookingModal;

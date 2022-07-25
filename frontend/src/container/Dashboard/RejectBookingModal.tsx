import React, { useState } from 'react';
import { Form, Input, Modal } from 'antd';
import { BookingStatus, IBooking, updateBookingAPI } from '../../api/Booking';
import {
  IconTypeNotification,
  openNotification,
} from '../../component/Notification';

const { TextArea } = Input;

interface IProps {
  open: boolean;
  setOpenModal: (value: boolean) => void;
  handleUpdateListBooking: (data: IBooking) => void;
  bookingData: IBooking;
}

const RejectBookingModal = ({
  open,
  setOpenModal,
  handleUpdateListBooking,
  bookingData,
}: IProps) => {
  const [form] = Form.useForm();

  const handleRejectBooking = async (data: any) => {
    try {
      const updateBooking = {
        ...bookingData,
        rejectedReason: data.reason,
        status: BookingStatus.rejected,
      };
      const result = await updateBookingAPI(
        bookingData.id || '',
        updateBooking
      );

      openNotification(
        IconTypeNotification.success,
        'Rejected Booking successfully'
      );
      handleUpdateListBooking(updateBooking);
      setOpenModal(false);
      form.resetFields();
    } catch (error: any) {
      openNotification(IconTypeNotification.error, error.message);
    }
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

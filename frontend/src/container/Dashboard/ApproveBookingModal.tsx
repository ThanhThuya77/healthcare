import React, { useState } from 'react';
import moment from 'moment';
import { Form, Modal, Radio, Space } from 'antd';
import { BookingStatus, IBooking, updateBookingAPI } from '../../api/Booking';
import {
  IconTypeNotification,
  openNotification,
} from '../../component/Notification';

interface IProps {
  open: boolean;
  setOpenModal: (value: boolean) => void;
  handleUpdateListBooking: (data: IBooking) => void;
  bookingData: IBooking;
}

const ApproveBookingModal = ({
  open,
  setOpenModal,
  handleUpdateListBooking,
  bookingData,
}: IProps) => {
  const [selectedDate, setSelectedDate] = useState(1);

  const [form] = Form.useForm();

  const onChangeRadio = (date: any) => {
    setSelectedDate(date);
  };
  const handleApproveBooking = async (data: any) => {
    try {
      const updateBooking = {
        ...bookingData,
        confirmProposedDate: data.proposedDate,
        status: BookingStatus.approved,
      };
      const result = await updateBookingAPI(
        bookingData.id || '',
        updateBooking
      );

      openNotification(
        IconTypeNotification.success,
        'Approved Booking successfully'
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
      title="Approve a booking"
      visible={open}
      onOk={form.submit}
      onCancel={() => {
        setOpenModal(false);
        form.resetFields();
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
              {bookingData.proposedDate?.map((item) => (
                <Radio key={item} value={item}>
                  {moment(item).format('MM-DD-YYYY HH:mm:ss')}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ApproveBookingModal;

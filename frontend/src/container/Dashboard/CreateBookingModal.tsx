import React, { useContext, useState } from 'react';
import moment, { Moment } from 'moment';
import { Col, DatePicker, Form, Input, Modal, Row, Select, Space } from 'antd';
import { createBookingAPI, IBooking } from '../../api/Booking';
import { openNotification } from '../../component/Notification';
import { IconTypeNotification } from '../../component/Notification';
import { Context } from '../../store/Context';

interface IProposedDates {
  [key: string]: Moment;
}

interface IProps {
  open: boolean;
  setOpenModal: (value: boolean) => void;
  handleUpdateListBooking: (data: IBooking) => void;
}

const CreateBookingModal = ({
  open,
  setOpenModal,
  handleUpdateListBooking,
}: IProps) => {
  const { state } = useContext(Context);
  const [proposedDates, setProposeDates] = useState<IProposedDates>({});

  const [form] = Form.useForm();

  const disabledDate = (current: any) => {
    const isExisted = Object.keys(proposedDates).some(
      (item) =>
        proposedDates[item]?.startOf('day')?.unix() ===
        current?.startOf('day')?.unix('YYYY-MM-DD')
    );

    return (current && current <= moment().add(1, 'days')) || isExisted;
  };

  const handleCreateBooking = async (data: any) => {
    try {
      const result = await createBookingAPI(state.id || '', data);
      openNotification(
        IconTypeNotification.success,
        'Created Booking successfully'
      );
      handleUpdateListBooking(result);
      setOpenModal(false);
      form.resetFields();
      setProposeDates({});
    } catch (error: any) {
      openNotification(IconTypeNotification.error, error.message);
    }
  };

  const handleSetProposeDates = (date: any, pos: string) => {
    const data = { ...proposedDates, [pos]: date };
    const inValid = Object.keys(data).some((item) => !data[item]);
    if (!inValid && Object.keys(data).length === 3) {
      form.setFieldsValue({ proposedDate: Object.values(data) });
    }
    setProposeDates(data);
  };

  const renderDatePicker = (index: string) => (
    <DatePicker
      key={index}
      name={`proposedDate${index}`}
      format="YYYY-MM-DD HH:mm:ss"
      disabledDate={disabledDate}
      showTime
      showNow={false}
      onChange={(date) => handleSetProposeDates(date, index)}
      style={{ width: '100%' }}
    />
  );

  return (
    <Modal
      title="Create a Booking"
      visible={open}
      onOk={form.submit}
      onCancel={() => {
        setOpenModal(false);
        form.resetFields();
      }}
      okText="Create"
    >
      <Form
        labelCol={{ span: 6 }}
        layout="horizontal"
        labelAlign="left"
        form={form}
        onFinish={handleCreateBooking}
      >
        <Form.Item
          name="event"
          label="Type of event"
          rules={[
            {
              required: true,
              message: 'Please select your event!',
            },
          ]}
        >
          <Select placeholder="Select event">
            {['Health Talk', 'Wellness Events', 'Fitness Activities'].map(
              (item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              )
            )}
          </Select>
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: 'Please enter location!' }]}
        >
          <Input placeholder="Please enter location" />
        </Form.Item>

        <Form.Item
          label="Proposed Date and Time"
          name="proposedDate"
          rules={[
            { required: true, message: 'Please select all proposed Date!' },
          ]}
          style={{ flexDirection: 'column' }}
          labelCol={{ span: 10 }}
        >
          <Row>
            <Col span={6} />
            <Col span={18}>
              <Space direction="vertical" style={{ width: '100%' }}>
                {['1', '2', '3'].map((index) => renderDatePicker(index))}
              </Space>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateBookingModal;

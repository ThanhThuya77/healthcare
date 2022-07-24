import { useContext, useEffect, useState } from 'react';
import { Moment } from 'moment';
import './styles.scss';

import { Button, Modal, Space, Spin, Table, Tag } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Context } from '../../store/Context';
import CreateBookingModal from './CreateBookingModal';
import RejectBookingModal from './RejectBookingModal';
import ApproveBookingModal from './ApproveBookingModal';

const { confirm } = Modal;

export enum BookingStatus {
  approved = 'Approved',
  rejected = 'Rejected',
  pendingReview = 'Pending Review',
}

type IStatus = `${BookingStatus}`;

interface IBooking {
  event: string;
  location: string;
  status: IStatus;
  proposedDate?: Moment;
}

interface IProps {}

const Dashboard = ({}: IProps) => {
  const { state, dispatch } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(false);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openRejectModal, setOpenRejectModal] = useState<boolean>(false);
  const [openApproveModal, setOpenApproveModal] = useState<boolean>(false);

  useEffect(() => {
    // setLoading(true);
    // fetch('/getBookingEvents')
    //   .then((response) => response.json())
    //   .then((data) => {console.log(data); setLoading(true);});
  }, []);

  const data = [
    {
      key: '1',
      event: 'Health Talk',
      location: 'Hồ Chí Minh',
      status: BookingStatus.pendingReview,
    },
    {
      key: '2',
      event: 'Wellness Events',
      location: 'Hồ Chí Minh',
      status: BookingStatus.approved,
    },
    {
      key: '3',
      event: 'Fitness Activities',
      location: 'Hồ Chí Minh',
      status: BookingStatus.rejected,
    },
  ];

  const handleCancelBooking = () => {
    confirm({
      title: 'Do you Want to cancel this booking?',
      icon: <ExclamationCircleOutlined />,
      centered: true,

      onOk() {
        console.log('OK');
      },

      // onCancel() {
      //   console.log('Cancel');
      // },
    });
  };

  const handleApproveBooking = () => {
    console.log('handleApproveBooking');
  };

  const handleRejectBooking = () => {
    console.log('handleRejectBooking');
  };

  const renderActionBtns = (record: IBooking) => {
    return record.status === BookingStatus.pendingReview ? (
      !state.isAdmin ? (
        <Button onClick={handleCancelBooking}>Cancel</Button>
      ) : (
        <Space>
          <Button
            className="successBtn"
            onClick={() => setOpenApproveModal(true)}
          >
            Approve
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => setOpenRejectModal(true)}
          >
            Reject
          </Button>
        </Space>
      )
    ) : null;
  };

  const columns = [
    {
      title: 'Type of event',
      dataIndex: 'event',
      key: 'event',
      render: (text: string) => text,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: '220px',
      render: (text: string) => text,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      width: '180px',
      align: 'center' as const,
      render: (status: IStatus) => {
        let color = '';

        switch (status) {
          case BookingStatus.approved:
            color = 'green';
            break;

          case BookingStatus.rejected:
            color = 'volcano';
            break;

          case BookingStatus.pendingReview:
            color = 'blue';
            break;
        }

        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: state.isAdmin ? '240px' : '140px',
      align: 'center' as const,
      render: (_: any, record: IBooking) => (
        <Space size="middle">{renderActionBtns(record)}</Space>
      ),
    },
  ];

  return loading ? (
    <Spin />
  ) : (
    <div>
      <div className="toolbar">
        <Button
          size={'large'}
          type="primary"
          onClick={() => {
            setOpenCreateModal(true);
          }}
        >
          Create a Booking
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />

      <CreateBookingModal
        open={openCreateModal}
        setOpenModal={setOpenCreateModal}
      />

      <RejectBookingModal
        open={openRejectModal}
        setOpenModal={setOpenRejectModal}
      />

      <ApproveBookingModal
        open={openApproveModal}
        setOpenModal={setOpenApproveModal}
      />
    </div>
  );
};

export default Dashboard;

import { useContext, useEffect, useState } from 'react';
import './styles.scss';

import { Button, Modal, Space, Spin, Table, Tag } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Context } from '../../store/Context';
import CreateBookingModal from './CreateBookingModal';
import RejectBookingModal from './RejectBookingModal';
import ApproveBookingModal from './ApproveBookingModal';
import {
  BookingStatus,
  getAllBookingAPI,
  getAllMyBookingAPI,
  IBooking,
  IStatus,
  removeBookingAPI,
} from '../../api/Booking';
import {
  IconTypeNotification,
  openNotification,
} from '../../component/Notification';
import moment from 'moment';

const { confirm } = Modal;

const Dashboard = () => {
  const { state } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(true);
  const [allBooking, setAllBooking] = useState<IBooking[]>([]);
  const [bookingData, setBookingData] = useState<IBooking>({} as IBooking);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openRejectModal, setOpenRejectModal] = useState<boolean>(false);
  const [openApproveModal, setOpenApproveModal] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      let result;
      if (state.isAdmin) {
        result = await getAllBookingAPI();
      } else {
        result = await getAllMyBookingAPI(state.id || '');
      }
      setAllBooking(result);
      setLoading(false);
    };
    if (state.id) {
      getData();
    }
  }, [state]);

  const handleCancelBooking = (id: string) => {
    confirm({
      title: 'Do you Want to cancel this booking?',
      icon: <ExclamationCircleOutlined />,
      centered: true,

      async onOk() {
        try {
          const result = await removeBookingAPI(id);
          openNotification(
            IconTypeNotification.success,
            'Cancel Booking successfully'
          );
          handleUpdateListBooking({ id } as IBooking, true);
        } catch (error: any) {
          openNotification(IconTypeNotification.error, error.message);
        }
      },
    });
  };

  const handleUpdateListBooking = (data: IBooking, isRemove = false) => {
    let newData = [...allBooking];
    const pos = newData.findIndex((booking) => booking.id === data.id);

    if (pos === -1) {
      newData = [...allBooking, data];
    } else {
      if (isRemove) {
        newData = allBooking.filter((item) => item.id !== data.id);
      } else {
        newData[pos] = data;
        setBookingData({} as IBooking);
      }
    }
    setAllBooking(newData);
  };

  const renderActionBtns = (record: IBooking) => {
    return record.status === BookingStatus.pendingReview ? (
      !state.isAdmin ? (
        <Button onClick={() => handleCancelBooking(record.id || '')}>
          Cancel
        </Button>
      ) : (
        <Space>
          <Button
            className="successBtn"
            onClick={() => {
              setOpenApproveModal(true);
              setBookingData(record);
            }}
          >
            Approve
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              setOpenRejectModal(true);
              setBookingData(record);
            }}
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
      width: '160px',
      render: (text: string) => text,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
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
      title: 'Confirm propose date',
      dataIndex: 'confirmProposedDate',
      key: 'confirmProposedDate',
      width: '180px',
      align: 'center' as const,
      render: (_: any, record: IBooking) =>
        record.confirmProposedDate
          ? moment(record.confirmProposedDate).format('MM-DD-YYYY HH:mm:ss')
          : '',
    },
    {
      title: 'Reason of rejected',
      dataIndex: 'rejectedReason',
      key: 'rejectedReason',
      width: '180px',
      align: 'center' as const,
      render: (text: string) => <div className="wordBreak">{text}</div>,
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
      {!state.isAdmin ? (
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
      ) : null}
      <Table
        columns={columns}
        dataSource={allBooking}
        rowKey="id"
        pagination={{
          defaultPageSize: 5,
        }}
      />

      <CreateBookingModal
        open={openCreateModal}
        setOpenModal={setOpenCreateModal}
        handleUpdateListBooking={handleUpdateListBooking}
      />

      <RejectBookingModal
        open={openRejectModal}
        setOpenModal={setOpenRejectModal}
        handleUpdateListBooking={handleUpdateListBooking}
        bookingData={bookingData}
      />

      <ApproveBookingModal
        open={openApproveModal}
        setOpenModal={setOpenApproveModal}
        handleUpdateListBooking={handleUpdateListBooking}
        bookingData={bookingData}
      />
    </div>
  );
};

export default Dashboard;

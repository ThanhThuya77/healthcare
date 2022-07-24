import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button, Modal, Table, Spin, Form, Input, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  setFindCategory,
} from 'redux/Home/actions';

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Category = () => {
  const [loading, setLoading] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [id, setId] = useState(null);
  const [isAdd, setIsAdd] = useState(true);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { categories = {}, findCategory } = useSelector(
    (state) => state.home || {}
  );
  const { data = [], pagination = {} } = categories;

  const getListCategories = useCallback(() => {
    dispatch(getCategories(findCategory));
  }, [dispatch, findCategory]);

  useEffect(() => {
    setLoading(true);
    getListCategories();
    form.setFieldsValue({
      name: '',
      parent_category_name: '',
      category_id: '',
    });
  }, [form, getListCategories]);

  const onShowSizeChange = (current, pageSize) => {
    dispatch(setFindCategory({ page: current, per_page: pageSize }));
  };

  const onChangePagination = (value) => {
    dispatch(setFindCategory({ page: value }));
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'category_id',
      key: 'category_id',
      width: '10%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
    },
    {
      title: 'Parent category',
      dataIndex: 'parent_category_name',
      key: 'parent_category_name',
      width: '40%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '10%',
      align: 'center',
      render: (text, record) => (
        <div className="action-icon">
          <Button type="link" onClick={() => handleOpenEdit(record)}>
            <EditOutlined />
          </Button>
          <Button
            type="link"
            onClick={() => {
              setOpenRemove(true);
              setId(record.category_id);
            }}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const handleOpenEdit = async (record) => {
    setId(record.category_id);
    if (form.setFieldsValue) {
      form.setFieldsValue(record);
    }
    handleOpenModel(false);
  };

  const handleCancelAdd = () => {
    setOpenAdd(false);
    if (form.resetFields) {
      form.resetFields();
    }
  };

  const handleAdd = (values) => {
    dispatch(createCategory(values, () => getListCategories()));
  };

  const handleEdit = (values) => {
    dispatch(updateCategory({ id, ...values }, () => getListCategories()));
  };

  const onFinish = (values) => {
    if (isAdd) {
      handleAdd(values);
    } else {
      handleEdit(values);
    }
    setOpenAdd(false);
  };

  const handleDeleteCategory = () => {
    dispatch(
      deleteCategory(id, () => {
        getListCategories();
        setOpenRemove(false);
      })
    );
  };

  const handleOpenModel = (isAdd = true) => {
    setOpenAdd(true);
    setIsAdd(isAdd);
    if (form.resetFields) {
      form.resetFields();
    }
  };

  return (
    <Spin wrapperClassName="customer-table" spinning={data.length <= 0}>
      <div className="group-button">
        <Button onClick={handleOpenModel} className="add-button">
          Add
        </Button>
      </div>
      <Table
        scroll={{ y: 400 }}
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey={(row) => row.category_id}
      />
      <Pagination
        total={pagination.total}
        pageSize={10}
        current={findCategory.page}
        onShowSizeChange={onShowSizeChange}
        onChange={onChangePagination}
      />
      <Modal
        visible={openAdd}
        title={isAdd ? 'Add category' : 'Edit category'}
        onOk={() => setOpenAdd(false)}
        onCancel={handleCancelAdd}
        footer={null}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          form={form}
          validateMessages={validateMessages}
          onFinish={onFinish}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Please enter name" />
          </Form.Item>
          <Form.Item label="Parent category" name="parent_category_name">
            <Input placeholder="Please enter parent category" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button htmlType="button" onClick={handleCancelAdd}>
              Canel
            </Button>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              style={{ marginLeft: 20 }}
            >
              {isAdd ? 'Add' : 'Edit'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Delete category"
        visible={openRemove}
        onOk={handleDeleteCategory}
        confirmLoading={loading}
        onCancel={() => setOpenRemove(false)}
        className="model-remove"
      >
        <p>Do you want to remove this category ?</p>
      </Modal>
    </Spin>
  );
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
};

export default Category;

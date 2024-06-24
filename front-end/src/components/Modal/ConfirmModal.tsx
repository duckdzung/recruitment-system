import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface ConfirmModalProps {
    title: string;
    content: string;
    okText: string;
    cancelText: string;
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    title,
    content,
    okText,
    isOpen,
    cancelText,
    onConfirm,
    onCancel,
}) => {
    const [modal, contextHolder] = Modal.useModal();

    const confirm = () => {
        modal.confirm({
            title,
            icon: <ExclamationCircleOutlined />,
            content,
            okText,
            cancelText,
            onOk: onConfirm,
            onCancel,
        });
    };

    useEffect(() => {
        if (isOpen) {
            confirm();
        }
    });

    return <>{contextHolder}</>;
};

export default ConfirmModal;

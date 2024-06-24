import React, { useState, useEffect } from 'react';
import { Modal, Input, Checkbox, Form, DatePicker } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import moment from 'moment';

export interface FormItem {
    name: string;
    label: string;
    type: 'text' | 'checkbox' | 'datetime';
    isDisabled: boolean;
}

interface EditModalProps {
    title: string;
    data: { [key: string]: any };
    isOpen: boolean;
    fields: FormItem[];
    onSave: (updatedData: { [key: string]: any }) => void;
    onCancel: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ title, data, isOpen, fields, onSave, onCancel }) => {
    const [formData, setFormData] = useState<{ [key: string]: any }>(data);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name || '']: checked,
        }));
    };

    const handleDateChange = (date: moment.Moment | null, dateString: any, name: string) => {
        console.log(date);
        setFormData((prev) => ({
            ...prev,
            [name]: dateString,
        }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    const renderFormItem = (field: FormItem) => {
        switch (field.type) {
            case 'text':
                return (
                    <Input
                        name={field.name}
                        value={formData[field.name]}
                        disabled={field.isDisabled}
                        onChange={handleInputChange}
                    />
                );
            case 'checkbox':
                return (
                    <Checkbox
                        name={field.name}
                        checked={formData[field.name]}
                        disabled={field.isDisabled}
                        onChange={handleCheckboxChange}
                    >
                        {field.label}
                    </Checkbox>
                );
            case 'datetime':
                return (
                    <DatePicker
                        name={field.name}
                        value={formData[field.name] ? moment(formData[field.name]) : null}
                        disabled={field.isDisabled}
                        onChange={(date, dateString) => handleDateChange(date, dateString, field.name)}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Modal title={title} open={isOpen} onOk={handleSave} onCancel={onCancel}>
            <Form>
                {fields.map((field) => (
                    <Form.Item key={field.name} label={field.label}>
                        {renderFormItem(field)}
                    </Form.Item>
                ))}
            </Form>
        </Modal>
    );
};

export default EditModal;

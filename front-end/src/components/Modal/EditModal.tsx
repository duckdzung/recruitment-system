import React, { useState, useEffect } from 'react';
import { Modal, Input, Checkbox, Form, DatePicker, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import moment, { Moment } from 'moment';

export interface FormItem {
    name: string;
    label: string;
    type: 'text' | 'checkbox' | 'datetime' | 'select';
    options?: any;
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

    const handleDateChange = (date: Moment | null, dateString: string | string[], name: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: date ? date.format('YYYY-MM-DD') : null,
        }));
    };

    const handleSelectChange = (value: any, name: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
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
                        value={formData[field.name] ? moment(formData[field.name]) : null}
                        disabled={field.isDisabled}
                        onChange={(date, dateString) => handleDateChange(date, dateString, field.name)}
                        format="YYYY-MM-DD"
                    />
                );
            case 'select':
                return (
                    <Select
                        value={formData[field.name]}
                        onChange={(value) => handleSelectChange(value, field.name)}
                        options={field.options}
                        disabled={field.isDisabled}
                        style={{ width: 150 }}
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

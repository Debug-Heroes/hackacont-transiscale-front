import React from 'react';
import InputMask from 'react-input-mask';

interface MaskedInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  id: string;
}

const MaskedInput: React.FC<MaskedInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  id,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <InputMask
        mask="(99) 99999-9999"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name='contato'
        className="rounded-sm bg-gray-50 p-2 border text-black border-transparent outline-none focus:border focus:border-gray-300/90"
      >
        {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
          <input
            {...inputProps}
            id={id} // Atribuindo o id ao input
          />
        )}
      </InputMask>
    </div>
  );
};

export default MaskedInput;

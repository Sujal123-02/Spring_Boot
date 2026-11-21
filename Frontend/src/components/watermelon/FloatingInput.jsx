import React, { useState } from 'react';

/**
 * Watermelon UI - Floating Input
 * Input field with smooth animated floating label and subtle focus ring.
 * Source: https://ui.watermelon.sh/animated-components/floating-input
 */
export const FloatingInput = ({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  placeholder = ' ',
  className = '',
  prefix,
  suffix,
  helperText,
  id,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const inputId = id || `floating-${Math.random().toString(36).substr(2, 9)}`;
  const hasValue = value !== undefined && value !== null && value.toString().length > 0;

  return (
    <div className={`space-y-1 ${className}`}>
      <div
        className={`
          relative flex items-center rounded-xl bg-white border transition-all duration-200
          ${focused ? 'border-[#1A1917] ring-1 ring-[#1A1917] shadow-xs' : 'border-[#DDD9D0] hover:border-[#BBB7AC]'}
        `}
      >
        {prefix && (
          <div className="pl-3.5 pr-2 py-3 text-xs font-semibold text-[#706D65] border-r border-[#E8E5DE] bg-[#FAF9F7] rounded-l-xl select-none">
            {prefix}
          </div>
        )}

        <div className="relative flex-1">
          <input
            id={inputId}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="peer w-full px-3.5 pt-5 pb-2 text-sm font-medium text-[#1A1917] bg-transparent outline-none placeholder-transparent"
            {...props}
          />

          <label
            htmlFor={inputId}
            className={`
              absolute left-3.5 transition-all duration-150 pointer-events-none select-none
              ${
                focused || hasValue
                  ? 'top-1.5 text-[10px] font-semibold text-[#8A867C]'
                  : 'top-3.5 text-xs font-medium text-[#A8A49A]'
              }
              ${focused ? 'text-[#1A1917]' : ''}
            `}
          >
            {label} {required && <span className="text-[#E0533C]">*</span>}
          </label>
        </div>

        {suffix && (
          <div className="pr-3.5 pl-2 text-xs text-[#8A867C] select-none">
            {suffix}
          </div>
        )}
      </div>

      {helperText && (
        <span className="text-[11px] text-[#8A867C] block px-1">
          {helperText}
        </span>
      )}
    </div>
  );
};

export default FloatingInput;

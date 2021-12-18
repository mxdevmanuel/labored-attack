import CaretDown from '@components/icons/caretdown';
import CaretRight from '@components/icons/caretright';
import React from 'react';

interface PivotCaretProps {
  open: boolean;
  className?: string;
}

const PivotCaret = (props: PivotCaretProps) => {
  return props.open ? (
    <CaretDown className={props.className ?? 'h-5 w-5'} />
  ) : (
    <CaretRight className={props.className ?? 'h-5 w-5'} />
  );
};

export default PivotCaret;

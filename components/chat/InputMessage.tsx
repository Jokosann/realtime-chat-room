'use client';

import { Button } from '@/components/shadcn/ui/button';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { Textarea } from '@/components/shadcn/ui/textarea';

export default function ButtonSend() {
  return (
    <div className="flex gap-2 items-center bg-white transition-all">
      <Textarea placeholder="Type your message here." />
      <Button variant="secondary">
        <PaperPlaneIcon className="-rotate-45" />
      </Button>
    </div>
  );
}

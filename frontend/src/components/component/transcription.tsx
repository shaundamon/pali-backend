import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function transcription() {
  return (
    <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto p-4 md:p-8">
      <div className="bg-background rounded-lg border">
        <div className="p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Transcription Service</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <MicIcon className="w-5 h-5 mr-2" />
                  Start Recording
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Start Recording</DialogTitle>
                  <DialogDescription>
                    Click the &quot;Start Recording&quot; button to begin
                    transcribing your audio.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button variant="outline">Start Recording</Button>
                </div>
                <DialogFooter>
                  <div>
                    <Button type="button">Cancel</Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Textarea
            className="resize-none h-[300px] text-muted-foreground"
            placeholder="Transcribed text will appear here..."
          />
          <Button>
            <DownloadIcon className="w-5 h-5 mr-2" />
            Save Transcript
          </Button>
        </div>
      </div>
      <div className="bg-background rounded-lg border">
        <div className="p-6 flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Chatbot</h2>
          <div className="flex-1 overflow-auto">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                  <AvatarFallback>OA</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-4 max-w-[80%]">
                  <p className="text-muted-foreground">
                    Hello! I&apos;m an AI assistant. How can I help you today?
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 justify-end">
                <div className="bg-primary rounded-lg p-4 max-w-[80%] text-primary-foreground">
                  <p>
                    Hi there! I&apos;m looking to transcribe some audio. Can you
                    help me with that?
                  </p>
                </div>
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                  <AvatarFallback>YO</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                  <AvatarFallback>OA</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-4 max-w-[80%]">
                  <p className="text-muted-foreground">
                    Absolutely! I&apos;d be happy to help with that. Just click
                    the &quot;Start Recording&quot; button and I&apos;ll
                    transcribe your audio in real-time.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <Textarea
              placeholder="Type your message..."
              className="min-h-[48px] rounded-2xl resize-none p-4 pr-16 border border-neutral-400 shadow-sm"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute w-8 h-8 top-3 right-3"
            >
              <ArrowUpIcon className="w-4 h-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  )
}


function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}


function MicIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

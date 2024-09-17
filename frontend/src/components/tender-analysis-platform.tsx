"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TenderAnalysisPlatformComponent() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [data, setData] = useState<
    {
      id: number;
      vendor: string;
      province: string;
      tenderCode: string;
      qualifications: string[];
    }[]
  >([]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Bot",
      content:
        "Welcome! Upload an Excel file with tender data to start analyzing.",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("upload");

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (files && files.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      formData.append("website", "");

      try {
        const response = await fetch("http://localhost:8000/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const result = await response.json();
        setMessages((prev) => [
          ...prev,
          { id: prev.length + 1, sender: "Bot", content: result },
        ]);
      } catch (error) {
        console.error("Error uploading file:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "Bot",
            content: "Error uploading file. Please try again.",
          },
        ]);
      }
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, sender: "You", content: newMessage },
      ]);

      try {
        const response = await fetch("http://localhost:8000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: newMessage,
          }),
        });

        if (!response.ok) {
          throw new Error("Chat query failed");
        }

        const result = await response.text();
        setMessages((prev) => [
          ...prev,
          { id: prev.length + 1, sender: "Bot", content: result },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "Bot",
            content: "Error processing your message. Please try again.",
          },
        ]);
      }

      setNewMessage("");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-background">
      <h1 className="text-3xl font-bold mb-6 text-foreground">
        Tender Analysis Platform
      </h1>
      <Tabs
        defaultValue={activeTab}
        className="space-y-4"
        onValueChange={(value: string) => setActiveTab(value)}
      >
        <TabsList className="grid w-full grid-cols-3 bg-secondary p-1 rounded-lg">
          <TabsTrigger
            value="upload"
            className="px-3 py-2 rounded-md transition-all text-secondary-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Upload Excel
          </TabsTrigger>
          <TabsTrigger
            value="view"
            className="px-3 py-2 rounded-md transition-all text-secondary-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            View Data
          </TabsTrigger>
          <TabsTrigger
            value="chat"
            className="px-3 py-2 rounded-md transition-all text-secondary-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Chat
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <Card className="bg-card text-card-foreground">
            <CardHeader className="bg-muted">
              <CardTitle className="text-primary">
                Upload Tender Excel File
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Input
                    id="excel-file"
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileSelection}
                    multiple
                    className="bg-input text-foreground"
                  />
                </div>
                {files && files.length > 0 && (
                  <p className="text-sm text-green-600 font-medium">
                    {files.length} file(s) selected
                  </p>
                )}
                <Button
                  onClick={handleUpload}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Upload Files
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="view">
          <Card className="bg-card text-card-foreground">
            <CardHeader className="bg-muted">
              <CardTitle className="text-primary">
                Tender Data Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted">
                      <TableHead className="font-bold text-foreground">
                        Vendor
                      </TableHead>
                      <TableHead className="font-bold text-foreground">
                        Province
                      </TableHead>
                      <TableHead className="font-bold text-foreground">
                        Tender Code
                      </TableHead>
                      <TableHead className="font-bold text-foreground">
                        Qualifications
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow key={row.id} className="hover:bg-muted/50">
                        <TableCell>{row.vendor}</TableCell>
                        <TableCell>{row.province}</TableCell>
                        <TableCell>{row.tenderCode}</TableCell>
                        <TableCell>{row.qualifications.join(", ")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground">
                  No data available. Please upload an Excel file with tender
                  data.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="chat">
          <Card className="bg-card text-card-foreground">
            <CardHeader className="bg-muted">
              <CardTitle className="text-primary">Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full rounded-md border border-border p-4 bg-background">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 ${
                      message.sender === "You" ? "text-right" : ""
                    }`}
                  >
                    <p className="font-semibold flex items-center text-foreground">
                      {message.sender === "Bot" && (
                        <span className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-primary"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                            />
                          </svg>
                        </span>
                      )}
                      {message.sender === "You" && (
                        <span className="ml-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-primary"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </span>
                      )}
                      {message.sender}
                    </p>
                    <p
                      className={`inline-block p-2 rounded-lg ${
                        message.sender === "You"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {message.content}
                    </p>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex items-center space-x-2 mt-4">
                <Input
                  placeholder="Ask about vendor qualifications..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="bg-input text-foreground placeholder-muted-foreground"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

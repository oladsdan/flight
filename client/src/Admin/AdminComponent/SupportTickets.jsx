
import { useState } from "react";
import { Card,
     Table,
     TableBody,
     TableCell,
     TableHead,
     TableHeadCell,
     TableRow,
     Dropdown,
     DropdownItem,
     TextInput,
     Badge,
     Button,
     Modal, 
     ModalBody, 
    //  ModalFooter, 
     ModalHeader,
    Label, Textarea
    

  } from "flowbite-react";


import { Calendar, Users, Activity } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";



const SupportTickets = () => {
//   const { toast } = useToast();
   const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  const [tickets, setTickets] = useState([
    {
      id: 'TK001',
      customerEmail: 'john.doe@email.com',
      subject: 'Unable to cancel booking',
      description: 'I am trying to cancel my booking but the system shows an error message.',
      priority: 'High',
      status: 'Open',
      category: 'Cancellation',
      createdDate: '2024-05-25'
    },
    {
      id: 'TK002',
      customerEmail: 'jane.smith@email.com',
      subject: 'Payment not processed',
      description: 'My payment was deducted but I did not receive booking confirmation.',
      priority: 'Urgent',
      status: 'In Progress',
      category: 'Payment',
      createdDate: '2024-05-24',
      assignedTo: 'Agent Smith'
    },
    {
      id: 'TK003',
      customerEmail: 'bob.wilson@email.com',
      subject: 'Seat selection issue',
      description: 'Cannot select preferred seats during booking process.',
      priority: 'Medium',
      status: 'Resolved',
      category: 'Technical',
      createdDate: '2024-05-23',
      assignedTo: 'Agent Johnson'
    }
  ]);

  const stats = {
    totalTickets: tickets.length,
    openTickets: tickets.filter(t => t.status === 'Open').length,
    inProgressTickets: tickets.filter(t => t.status === 'In Progress').length,
    urgentTickets: tickets.filter(t => t.priority === 'Urgent').length
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateTicketStatus = (ticketId, status) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status } : ticket
    ));
  };

  const assignTicket = (ticketId, agent) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, assignedTo: agent, status: 'In Progress' } : ticket
    ));
    
    // toast({
    //   title: "Ticket assigned",
    //   description: `Ticket ${ticketId} assigned to ${agent}`,
    // });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="pb-2">
            <div className="text-lg font-medium">Total Tickets</div>
            <div>All support tickets</div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-travel" />
              <span className="text-2xl font-bold">{stats.totalTickets}</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="pb-2">
            <div className="text-lg font-medium">Open</div>
            <div>Unassigned tickets</div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-red-600" />
              <span className="text-2xl font-bold">{stats.openTickets}</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="pb-2">
            <div className="text-lg font-medium">In Progress</div>
            <div>Being handled</div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-yellow-600" />
              <span className="text-2xl font-bold">{stats.inProgressTickets}</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="pb-2">
            <div className="text-lg font-medium">Urgent</div>
            <div>High priority tickets</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">{stats.urgentTickets}</div>
          </div>
        </Card>
      </div>

      <Card>
        <div>
          <div>Support Tickets</div>
          <div>Manage customer support requests and inquiries</div>
          <div className="mt-4">
            <TextInput
              placeholder="Search by email, subject, or ticket ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
        </div>
        <div>
          <Table>
            <TableHead>
              <TableHeadCell>Ticket ID</TableHeadCell>
              <TableHeadCell>Customer</TableHeadCell>
              <TableHeadCell>Subject</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Priority</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Assigned To</TableHeadCell>
              <TableHeadCell>Created</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </TableHead>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.customerEmail}</TableCell>
                  <TableCell className="max-w-xs truncate">{ticket.subject}</TableCell>
                  <TableCell>{ticket.category}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        ticket.priority === 'Urgent' ? 'destructive' :
                        ticket.priority === 'High' ? 'secondary' : 'outline'
                      }
                    >
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      color={
                        ticket.status === 'Open' ? 'failure' :
                        ticket.status === 'In Progress' ? 'purple' :
                        ticket.status === 'Resolved' ? 'success' : 'outline'
                      }
                    >
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{ticket.assignedTo || 'Unassigned'}</TableCell>
                  <TableCell>{new Date(ticket.createdDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button onClick={() => { setOpenModal(true); setSelectedTicket(ticket); }}>View</Button>

                    <Modal show={openModal} onClose={() => setOpenModal(false)}>
                        <ModalHeader>Ticket Details - {selectedTicket?.id}</ModalHeader>
                        <ModalBody>
                            <div className="space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Manage and respond to customer support ticket
                            </p>
                        
                            {selectedTicket && (
                                <div className="space-y-4">
                                <div>
                                    <Label>Customer Email</Label>
                                    <TextInput value={selectedTicket.customerEmail} readOnly />
                                </div>
                                <div>
                                    <Label>Category</Label>
                                    <TextInput value={selectedTicket.category} readOnly />
                                </div>
                                <div>
                                    <Label>Subject</Label>
                                    <TextInput value={selectedTicket.subject} readOnly />
                                </div>
                                <div>
                                    <Label>Description</Label>
                                    <Textarea value={selectedTicket.description} readOnly rows={4} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Status</Label>
                                            {/* <Select 
                                            value={selectedTicket.status} 
                                            onValueChange={(value) => updateTicketStatus(selectedTicket.id, value as SupportTicket['status'])}
                                            >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Open">Open</SelectItem>
                                                <SelectItem value="In Progress">In Progress</SelectItem>
                                                <SelectItem value="Resolved">Resolved</SelectItem>
                                                <SelectItem value="Closed">Closed</SelectItem>
                                            </SelectContent>
                                            </Select> */}


                                            <Dropdown label={selectedTicket.status} dismissOnClick={true}>
                                            <DropdownItem onClick={() => updateTicketStatus(selectedTicket.id, "Open")}>Open</DropdownItem>
                                            <DropdownItem onClick={() => updateTicketStatus(selectedTicket.id, "In Progress")}>In Progress</DropdownItem>
                                            <DropdownItem onClick={() => updateTicketStatus(selectedTicket.id, "Resolved")}>Resolved</DropdownItem>
                                            <DropdownItem onClick={() => updateTicketStatus(selectedTicket.id, "Closed")}>Closed</DropdownItem>
                                            </Dropdown>
                                        </div>
                                        <div>
                                            <Label>Assign To</Label>
                                            <Dropdown 
                                            value={selectedTicket.assignedTo || ""} 
                                            onValueChange={(value) => assignTicket(selectedTicket.id, value)}
                                            >
                                            
                                            <DropdownItem>
                                                Agent Smith
                                            </DropdownItem>
                                            <DropdownItem>
                                                Agent Johnson
                                            </DropdownItem>
                                            <DropdownItem>
                                                Agent Williams
                                            </DropdownItem>
                                            </Dropdown>
                                        </div>
                                </div>

                                </div>

                            )}
                             </div>
                        </ModalBody>
                        {/* <ModalFooter>
                            <Button onClick={() => setOpenModal(false)}>I accept</Button>
                            <Button color="alternative" onClick={() => setOpenModal(false)}>
                                Decline
                            </Button>
                         </ModalFooter> */}
                    </Modal>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default SupportTickets;



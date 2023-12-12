import { Body, Param, Controller, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEventDto } from './dto/create-event.dto';
import { TicketDto } from './dto/ticket.dto';
import { EventService } from './event.service';

@ApiTags('Events')
@Controller('')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // Creates an event in the database
  @Post('/create-event')
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  // Adds a ticket to an event (passing the event contract address as a parameter)
  @Put('/:contractAddress/create-ticket')
  async createTicket(
    @Body() ticketDto: TicketDto,
    @Param('contractAddress') contractAddress: string,
  ) {
    return this.eventService.createTicket(ticketDto, contractAddress);
  }

  // Resells a ticket (passing the event contract address as a parameter, the owner address and the quantity in the body)
  @Put('/:contractAddress/resell-ticket')
  async resellTicket(
    @Body() ownerAddress: string, quantity: number,
    @Param('contractAddress') contractAddress: string,
  ) {
    return this.eventService.resellTicket(ownerAddress, quantity, contractAddress);
  }

  
}

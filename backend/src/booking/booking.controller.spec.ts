import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { BookingStatus } from './booking.model';
import { BookingService } from './booking.service';

describe('BookingController', () => {
  let controller: BookingController;

  const allBooking = [
    {
      id: '62df4516184ba6889a660712',
      event: 'Health Talk',
      location: 'HCM',
      proposedDate: [
        '2022-07-27T17:00:00.000Z',
        '2022-07-28T17:00:00.000Z',
        '2022-07-29T17:00:00.000Z',
      ],
      confirmProposedDate: '2022-07-28T17:00:00.000Z',
      status: 'Approved',
      createdByUserId: '62df441e184ba6889a660706',
    },
    {
      id: '62df4527184ba6889a660714',
      event: 'Health Talk',
      location: 'Binh Duong',
      proposedDate: [
        '2022-07-28T17:00:00.000Z',
        '2022-07-29T17:00:00.000Z',
        '2022-07-30T17:00:00.000Z',
      ],
      rejectedReason: 'no suitable date',
      status: 'Rejected',
      createdByUserId: '62df441e184ba6889a660706',
    },
    {
      id: '62df4552184ba6889a660718',
      event: 'Wellness Events',
      location: 'Binh Thuan',
      proposedDate: [
        '2022-08-09T17:00:00.000Z',
        '2022-08-16T17:00:00.000Z',
        '2022-08-23T17:00:00.000Z',
      ],
      status: 'Pending Review',
      createdByUserId: '62df441e184ba6889a660706',
    },
  ];

  const mockBookingService = {
    create: jest
      .fn()
      .mockImplementation((userId, body) => ({ ...body, id: Date.now() })),
    findAll: jest.fn().mockImplementation(() => allBooking),
    findOne: jest.fn().mockImplementation(() => allBooking[0]),
    update: jest
      .fn()
      .mockImplementation((bookingId, body) => ({ ...body, id: Date.now() })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [BookingService],
    })
      .overrideProvider(BookingService)
      .useValue(mockBookingService)
      .compile();

    controller = module.get<BookingController>(BookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a booking', async () => {
    const body = {
      event: 'Health Talk',
      location: 'HCM',
      proposedDate: [
        new Date().toString(),
        new Date().toString(),
        new Date().toString(),
      ],
    };
    const result = await controller.create('userId1', body);

    expect(result).toEqual({
      ...body,
      id: expect.any(Number),
    });

    expect(mockBookingService.create).toHaveBeenCalled();
  });

  it('should find all booking', async () => {
    expect(controller.findAll()).toEqual(allBooking);
    expect(mockBookingService.findAll).toHaveBeenCalled();
  });

  it('should find booking by id', async () => {
    expect(controller.findOne('1')).toEqual(allBooking[0]);
    expect(mockBookingService.findAll).toHaveBeenCalled();
  });

  it('should update a booking', async () => {
    const body = {
      event: 'Health Talk',
      location: 'HCM',
      proposedDate: [
        new Date().toString(),
        new Date().toString(),
        new Date().toString(),
      ],
      status: BookingStatus.rejected,
      rejectedReason: 'not found',
    };
    const result = await controller.update('bookingId', body);

    expect(result).toEqual({
      ...body,
      id: expect.any(Number),
    });

    expect(mockBookingService.update).toHaveBeenCalled();
  });
});

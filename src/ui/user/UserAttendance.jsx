import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useGetAttendance from '../../features/attendance/useGetAttendance';
import '../../utils/css/attendance.css';

const localizer = momentLocalizer(moment);

const isWeeklyOff = (date) => {
    const dayOfWeek = moment(date).day();
    const dayOfMonth = moment(date).date();
    return dayOfWeek === 0 || (dayOfWeek === 6 && (dayOfMonth > 7 && dayOfMonth <= 14 || dayOfMonth > 21 && dayOfMonth <= 28));
};

const isAlternateSaturdayOff = (date) => {
    const dayOfMonth = moment(date).date();
    return dayOfMonth % 14 === 0; // Alternate Saturdays
};

const isAlternateSundayOff = (date) => {
    const dayOfWeek = moment(date).day();
    return dayOfWeek === 0 && moment(date).date() % 14 !== 0; // Alternate Sundays
};

const UserAttendance = () => {
    const { data: employeesData, isPending: attendanceLoading } = useGetAttendance();
    const userAttendance = employeesData?.data?.attendance;

    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (userAttendance) {
            const processedEvents = generateEvents(userAttendance);
            setEvents(processedEvents);
        }
    }, [userAttendance]);

    const generateEvents = (attendanceData) => {
        const processedEvents = [];
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        for (let date = new Date(firstDayOfMonth); date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
            const dateString = moment(date).format('YYYY-MM-DD');

            // Include weekly offs for all dates
            if (isWeeklyOff(date) || isAlternateSaturdayOff(date) || isAlternateSundayOff(date)) {
                processedEvents.push({
                    title: 'WO',
                    start: new Date(dateString),
                    end: new Date(dateString),
                    type: 'weeklyOff',
                    classNames: 'weeklyOff',
                });
            } else {
                // Check if there is attendance data for the date
                const attendanceEntry = attendanceData.find(entry => moment(entry.date).format('YYYY-MM-DD') === dateString);

                // If attendance data exists, determine if the employee is present or absent
                if (attendanceEntry) {
                    const loginTime = new Date(attendanceEntry?.loginTime);
                    const logoutTime = new Date(attendanceEntry?.logoutTime);

                    if (loginTime && loginTime <= today) {
                        if (logoutTime) {
                            // Employee is present
                            processedEvents.push({
                                title: 'P',
                                desc: `${moment(loginTime).format('hh:mm')}-${moment(logoutTime).format('hh:mm')}`,
                                start: new Date(dateString),
                                end: new Date(dateString),
                                type: 'present',
                                classNames: 'present',
                            });
                        } else {
                            // Employee is absent
                            processedEvents.push({
                                title: 'A',
                                start: new Date(dateString),
                                end: new Date(dateString),
                                type: 'absent',
                                classNames: 'absent',
                            });
                        }
                    }
                } else if (date <= today) {
                    // Employee is absent
                    processedEvents.push({
                        title: 'A',
                        start: new Date(dateString),
                        end: new Date(dateString),
                        type: 'absent',
                        classNames: 'absent',
                    });
                }
            }
        }

        return processedEvents;
    };

    const eventStyleGetter = (event, start, end, isSelected) => {
        let style = {};
        // Customize style for a particular event
        if (event.title === 'WO') {
            style.backgroundColor = '#e53935';
            style.color = '#fff';
        } else if (event.title === 'A') {
            style.backgroundColor = '#e53935';
            style.color = '#fff';
        } else if (event.title === 'P') {
            style.backgroundColor = '#1df52bc9';
            style.color = '#fff';
        }

        return {
            style
        };
    };

    // Custom Event component to include login and logout times
    const CustomEvent = ({ event }) => (
        <div>
            <strong className='text-sm'>{event.title}</strong>
            {event.desc && (
                <div className='text-[13px] font-semibold'>
                    {event.desc}
                </div>
            )}
        </div>
    );

    const today = new Date();

    return (
        <div className='h-[100vh] bg-white p-4'>
            {
                !attendanceLoading && (
                    <Calendar
                        localizer={localizer}
                        events={events}
                        views={['month']}
                        step={1}
                        defaultDate={today}
                        eventPropGetter={eventStyleGetter}
                        components={{ event: CustomEvent }} // Use CustomEvent component for rendering events
                    />
                )
            }
        </div>
    );
};

export default UserAttendance;

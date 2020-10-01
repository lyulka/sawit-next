import React, { useEffect, useState, useContext } from 'react';
import {
  VictoryBar, VictoryChart, VictoryAxis, VictoryTheme,
} from 'victory';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import { OARBeliContext } from '../../contexts/OARBeliContext';

const getInitialDateRange = () => {
  const date = moment();
  const day = date.day();
  const startDate = moment();

  if (date.day() === 0) startDate.date(date.date() - 7);
  else startDate.date(date.date() - day);

  startDate.hours(0);
  startDate.minutes(0);
  startDate.seconds(0);

  const endDate = moment(startDate);
  endDate.date(startDate.date() + 7);

  return {
    startDate,
    endDate,
  };
};

export default function OarbeliIndex() {
  const { oarbelis, deleteOarbeli, getAllOarbeli } = useContext(OARBeliContext);
  const [week, setWeek] = useState(getInitialDateRange());
  const [weekOarbeliArray, setWeekOarbeliArray] = useState([]);

  const incrementWeek = () => {
    week.startDate.date(week.startDate.date() + 7);
    week.endDate.date(week.endDate.date() + 7);

    setWeek({ startDate: week.startDate, endDate: week.endDate });
  };

  const decrementWeek = () => {
    week.startDate.date(week.startDate.date() - 7);
    week.endDate.date(week.endDate.date() - 7);

    setWeek({ startDate: week.startDate, endDate: week.endDate });
  };

  const getWeekOarbeli = () => {
    const relevantOarbeliArray = Object.values(oarbelis).filter(
      (entry) => entry.date >= week.startDate && entry.date < week.endDate,
    );

    const weekOarbeli = [];

    relevantOarbeliArray.forEach((entry) => {
      weekOarbeli[entry.date.day()] = entry;
    });

    for (let i = 0; i <= 6; i += 1) {
      if (weekOarbeli[i] == null) {
        const dummyMoment = moment(week.startDate);
        dummyMoment.date(week.startDate.date() + i);
        weekOarbeli[i] = { date: dummyMoment, oarBeli: 0 };
      }
    }

    setWeekOarbeliArray(weekOarbeli);
  };

  useEffect(() => {
    getAllOarbeli();
  },
  []);

  useEffect(() => {
    getWeekOarbeli();
  }, [week, oarbelis]);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => moment(date).format('DD/MM/YYYY'),
    },
    {
      title: 'OAR Beli',
      dataIndex: 'oarBeli',
      key: 'oarbeli',
      render: (fraction) => `${fraction * 100}%`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Card>
            <CardContent>
              <Link
                href={`OARBeli/edit/${record.key}`}
                display="block"
              >
                <EditIcon />
                {' '}
                Edit /
                {' '}
              </Link>
            </CardContent>
          </Card>
          <Button onClick={() => deleteOarbeli(record.key)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>

      <VictoryChart
        domainPadding={20}
        theme={VictoryTheme}
        scale={{ x: 'time' }}
      >

        <VictoryAxis
          tickValues={[1, 2, 3, 4, 5, 6, 7]}
          tickFormat={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
        />

        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`${x * 100}%`)}
        />

        <VictoryBar
          data={weekOarbeliArray}
          y="oarBeli"
        />

      </VictoryChart>

      <span>
        {`Week of ${week.startDate.date()}/${week.startDate.month() + 1}/${week.startDate.year()}
              - ${week.endDate.date() - 1}/${week.endDate.month() + 1}/${week.endDate.year()}`}
      </span>

      <div>
        <Button
          type="link"
          onClick={decrementWeek}
        >
          <ArrowBackIcon />
          Previous week
        </Button>
        <Button
          type="link"
          onClick={incrementWeek}
        >
          Next week
          <ArrowForwardIcon />
        </Button>
        <Button
          type="link"
          onClick={() => setWeek(getInitialDateRange())}
        >
          Current week
        </Button>
      </div>

      <Button>
        <AddIcon />
        <Link href="/OARBeli/add">
          Add OAR Beli
        </Link>
      </Button>

      <Table
        dataSource={Object.values(oarbelis)}
        columns={columns}
      />

      <TableContainer component={Paper}>
        <Table aria-label="oarbeli table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">OAR Beli</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(oarbelis).map((entry) => (
              <TableRow key={moment(entry.date).format('DD/MM/YYYY')}>
                <TableCell align="right" component="th" scope="row">
                  {moment(entry.date).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell align="right">
                  {`${entry.oarBeli * 100}%`}
                </TableCell>
                <TableCell align="right">
                  <Card>
                    <CardContent>
                      <Link
                        href={`oarbeli/edit/${entry.date}`}
                        display="block"
                      >
                        <EditIcon />
                        {' '}
                        Edit /
                        {' '}
                      </Link>
                    </CardContent>
                  </Card>
                  <Button onClick={() => deleteOarbeli(entry.date)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
}

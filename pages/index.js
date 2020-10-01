import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import styles from '../styles/Home.module.css';

const useStyles = makeStyles((theme) => ({
  linkCard: {
    marginBottom: `${theme.spacing(2)}px`,
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={styles.container}>
      <Head>
        <title>Sawit Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography
          variant="h1"
        >
          Sawit Next
        </Typography>
        <Card className={classes.linkCard}>
          <CardContent>
            <Link
              href="/oarbeli"
              variant="h2"
              display="block"
            >
              OAR beli
            </Link>
          </CardContent>
        </Card>
        <Card className={classes.linkCard}>
          <CardContent>
            <Link
              href="/oarlab"
              variant="h2"
              display="block"
            >
              Oar lab
            </Link>
          </CardContent>
        </Card>
        <Card className={classes.linkCard}>
          <CardContent>
            <Link
              href="/about"
              variant="h2"
              display="block"
            >
              About
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

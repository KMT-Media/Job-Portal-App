import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listJobs } from '../actions/jobActions';
import SearchBox from '../components/SearchBox';
import Job from '../components/Job';
import { useParams } from 'react-router-dom';

const HomeScreen = () => {
  const params = useParams();
  const keyword = params.keyword;
  const dispatch = useDispatch();
  const { loading, jobs, error } = useSelector((state) => state.jobList);

  useEffect(() => {
    dispatch(listJobs(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='jobs'>
          <SearchBox />
          {jobs.map((item) => (
            <AnimatePresence key={item._id}>
              <motion.div
                initial={{ opacity: 0.7, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Job item={item} />
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      )}
    </>
  );
};

export default HomeScreen;

import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API } from '../global'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { editMovie } from '../store/action/movieActions';
import '../css/Movie.css'

function EditMovie({ token }) {

    const [movie, setMovie] = useState(null);
    const { movieName } = useParams()

    useEffect(() => {

        //fetchMovie function
        const fetchMovie = async () => {
            const res = await fetch(`${API}/movie/movie-by-name/${movieName}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "x-auth-token": token
                },
            })
            const data = await res.json();
            if (data.movie) {
                setMovie(data.movie)
            }
        }
        fetchMovie();
    }, [movieName])

    return movie ? <EditMovieForm movie={movie} /> : <div className="spinner-border text-secondary mx-auto" role="status">
        <span className="visually-hidden">Loading...</span> </div>;

}

export default EditMovie

function EditMovieForm({ movie }) {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate();
    const error = useSelector(state => state.movie.error);
    const message = useSelector((state) => state.movie.message);

    // Extract actor names from the actors array and join them into a comma-separated string
    const actorNames = movie.actors.map(actor => actor.actorName).join(', ');

    const formik = useFormik({
        initialValues: {
            movieName: movie.movieName,
            yearOfRelease: movie.yearOfRelease,
            plot: movie.plot,
            poster: movie.poster,
            producer: movie.producer.producerName,
            actors: actorNames
        },
        validationSchema: Yup.object({
            movieName: Yup.string().required('Movie Name is Required'),
            yearOfRelease: Yup.number().required('Year is Required'),
            plot: Yup.string().required('Plot is Required'),
            poster: Yup.string().required('Poster is Required and give link for poster'),
            producer: Yup.string().required('Producer Name is Required'),
            actors: Yup.string().required('Actor Name is Required')
        }),
        onSubmit: async (values) => {
            try {
                const actorsString = values.actors.split(',');
                const newValues = { ...values, actors: actorsString };
                await dispatch(editMovie(movie._id, newValues));
                formik.resetForm();
                if (message) {
                    alert("Movie updated successfully")
                    navigate('/movieList')
                }
            } catch (error) {
                setErrorMessage(error.message);
            }
        },
    });

    return (
        <div className='m-5'>
            <h2 className='text-center text-light container' style={{ paddingTop: "50px", paddingBottom: "20px" }}>Edit Movie Page</h2>
            <div className='bg-white container-create-movie mx-auto'>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="moviename" className="form-label">Movie Name</label>
                    <input type="text"
                        placeholder="Enter Movie Name"
                        className="form-control"
                        id="moviename"
                        value={formik.values.movieName}
                        title="Enter Movie Name" {...formik.getFieldProps('movieName')} />
                    {formik.touched.movieName && formik.errors.movieName ? <div className='text-danger'>*{formik.errors.movieName}</div> : null}
                    <label htmlFor="year" className="form-label">Year Of Release</label>
                    <input type="text"
                        placeholder="Enter year as yyyy"
                        className="form-control"
                        id="year"
                        value={formik.values.yearOfRelease}
                        title="Enter year as yyyy" {...formik.getFieldProps('yearOfRelease')} />
                    {formik.touched.yearOfRelease && formik.errors.yearOfRelease ? <div className='text-danger'>*{formik.errors.yearOfRelease}</div> : null}
                    <label htmlFor="plot" className="form-label">Plot</label>
                    <input type="text"
                        placeholder="Enter story line of the movie"
                        className="form-control"
                        id="plot"
                        value={formik.values.plot}
                        title="Enter story line of the movie" {...formik.getFieldProps('plot')} />
                    {formik.touched.plot && formik.errors.plot ? <div className='text-danger'>*{formik.errors.plot}</div> : null}
                    <label htmlFor="poster" className="form-label">Poster</label>
                    <input type="text"
                        placeholder="Add a link for Poster"
                        className="form-control"
                        id="poster"
                        value={formik.values.poster}
                        title="Add a link for Poster" {...formik.getFieldProps('poster')} />
                    {formik.touched.poster && formik.errors.poster ? <div className='text-danger'>*{formik.errors.poster}</div> : null}
                    <label htmlFor="producer" className="form-label">Producer Name</label>
                    <input type="text"
                        placeholder="Enter Producer Name"
                        className="form-control"
                        id="producer"
                        value={formik.values.producer}
                        title="Enter Producer Name" {...formik.getFieldProps('producer')} />
                    {formik.touched.producer && formik.errors.producer ? <div className='text-danger'>*{formik.errors.producer}</div> : null}
                    <label htmlFor="actor" className="form-label">Actors Name</label>
                    <input type="text"
                        placeholder="Enter Actors Name separated by comma"
                        className="form-control"
                        id="actor"
                        value={formik.values.actors}
                        title="Enter Actors Name separated by comma(eg:Ajith,Vijay,Suriya)" {...formik.getFieldProps('actors')} />
                    {formik.touched.actors && formik.errors.actors ? <div className='text-danger'>*{formik.errors.actors}</div> : null}
                    <button type="submit" className="btn btn-warning mt-3">Update</button>
                    {error && <div className='text-danger text-center p-2'>{JSON.stringify(error)}</div>}
                    {errorMessage && <div className='text-danger text-center p-2'>{JSON.stringify(errorMessage)}</div>}
                </form>
            </div>
            <div className='d-flex justify-content-around p-4'><Link to={'/movie/create'} className='text-light'>Add Producer/Add Actor</Link><Link to={'/movieList'} className='text-light'>Movie List</Link></div>
        </div>

    )
}
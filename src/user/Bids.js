import Moment from "moment";
const Bids = (props) => {
  return (
    <div key={props._id} className="flex w-full ml-4">
      <div className="flex w-full gap-5 border-2 border-transparent shadow-2xl h-60">
        <div className="w-1/2 ">
          <img
            className="w-full h-full py-2 rounded-2xl"
            alt="pic"
            src={`http://localhost:8000/${props.image}`}
          />
        </div>
        <div className="grid w-1/2 grid-flow-row py-4 mt-5 text-lg text-blue-400 ">
          <div>
            <label>Name: {props.name}</label>
          </div>
          <div>
            <label>price: {props.price}</label>
          </div>
          <div>
            <label>Description: {props.description}</label>
          </div>
          <div>
            <label>
              Deadline: {Moment(props.productDeadline).format("LLLL")}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Bids;

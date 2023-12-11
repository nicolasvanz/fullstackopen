const Notification = ({ message, success = true }) => {
  if (message === null) {
    return null
  }
  const style = {
    color: success ? "green" : "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return(
    <div style={style} className={success ? "success" : "error"}>
      {message}
    </div>
  )
}

export default Notification
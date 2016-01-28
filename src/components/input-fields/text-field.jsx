import { Input } from 'react-bootstrap';


class ValidInput extends Input {

  validate() {

    if (this.getValue().length > 0 && this.props.validators !== undefined && this.props.validators.length > 0) {

      this.props.validators.map (validator) => {
        let validity = validator(this.getValue())
        if (typeof validity == 'string' || !validity) {
          this.setState({
            errorMessage: validity
          });
          return validity;
        }
      }
    }
  }

  render() {
    <Input { ...this.props } onChange={ this.validate() } />
  }
}



class FirstNameInput {

  validate() {

    ...
  }
  render() {

    <Input onChange={this.validate()} />
  }
}
import { ImagePicker, Button, ActivityIndicator } from 'antd-mobile'
import { post } from 'utils/request'
class ImagePickerExample extends React.Component {
  state = {
    files: [],
    multiple: false,
    data: null,
    isLoading: false,
  }
  onChange = (files, type, index) => {
    console.log(files, type, index)
    this.setState({
      files,
    })
  }
  onSegChange = e => {
    const index = e.nativeEvent.selectedSegmentIndex
    this.setState({
      multiple: index === 1,
    })
  }

  handleUpload = async () => {
    const formData = new FormData()
    formData.append('file', this.state.files[0].file)
    formData.append('name', 'hello world')
    this.setState({
      isLoading: true,
    })
    const data = await post('/img-recognize', formData)
    console.log('=========', data)
    this.setState({
      data,
      isLoading: false,
    })
  }

  render() {
    const { files, data, isLoading } = this.state
    return (
      <div>
        <ActivityIndicator text="解析中" animating={isLoading} />
        <ImagePicker
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 2}
          multiple={this.state.multiple}
        />
        {data ? (
          <>
            <h3>持仓成本价：{data.price}</h3>
            <h3>持有份额：{data.count}</h3>
          </>
        ) : null}
        <Button disabled={isLoading} onClick={this.handleUpload}>
          上传
        </Button>
      </div>
    )
  }
}

export default ImagePickerExample

import useClipboard from 'vue-clipboard3';

const { toClipboard } = useClipboard();

const copy = async (msg: string) => {
  try {
    await toClipboard(msg);
    console.log('Copied to clipboard');
  } catch (e) {
    console.error(e);
  }
};
export default copy;

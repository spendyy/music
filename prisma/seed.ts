const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

async function main() {
  const data = [
    {
      trackDownloadId: 6,
      track:
        "https://audiodevil.ru/getmp3/MC9Oak14TlRBd056TTBYelExTmpJME9UQTRPVjh5WWpnek5XUTRPREE1TTJFeVlXRmlNRGRmTmpRek1UWXlNVEF6TkRBeVlUTmpPR1k0THp3aGZDRS1XeUpuY3lJc01Dd2lZMjlrWlRFd0t5VkZNaVU0TUNVNU15dEpLMFpsWld3clRHbHJaU3RFZVdsdVp5c2xNamh2YkdRbE1qa2lMREVzYm5Wc2JDd3dMRFV3TERCZC9DT0RFMTArLSs4MCstK2krZmVlbCtsaWtlK2R5aW5nXyhhdWRpb2RldmlsLnJ1KS9DT0RFMTArJTJGKzgwKyVFMiU4MCU5MytpK2ZlZWwrbGlrZStkeWluZ18oYXVkaW9kZXZpbC5ydSk/cz12ayZyPSZjb29raWVzPTc5ODUzMzU2OTYyXzEuY29va2ll",
    },
    {
      trackDownloadId: 7,
      track:
        "https://audiodevil.ru/getmp3/MC9NelE1TkRFNU5UYzFYelExTmpJME1UUXhNMTgxWkdGaU16aGtPV014T0Rkak5EZzJaRGxmWkdObVpHVTFOVEEzT1RKaFpXUmtNRGN6THp3aGZDRS1XeUpuY3lJc01Dd2lRMDlFUlRFd0t5VkZNaVU0TUNVNU15dFRkVzF0WlhKTVQxWkZJaXd4TEc1MWJHd3NNQ3cxTUN3d1hRPT0vY29kZTEwKy0rU3VtbWVyTG92ZSslMjhscXc4MDgrcmV0aGluayUyOV8oYXVkaW9kZXZpbC5ydSkvY29kZTEwKyVFMiU4MCU5MytTdW1tZXJMb3ZlKyUyOGxxdzgwOCtyZXRoaW5rJTI5XyhhdWRpb2RldmlsLnJ1KT9zPXZrJnI9JmNvb2tpZXM9NzkxMTgyNDE0NTRfMS5jb29raWU=",
    },
    {
      trackDownloadId: 8,
      track:
        "https://audiodevil.ru/getmp3/MC9NalV4TWpFME9EVTRYelExTmpJMU1qTTFOMTg1WW1VeE0yVTFObVF3WVRGaU1URTRNV1pmTldJeFlqVmpZamN6TlRnM1pHUTVPREUxTHp3aGZDRS1XeUpuY3lJc01UY3NJa05QUkVVeE1Dc2xSVElsT0RBbE9UTXJTbFZKUTBVaUxERXNiblZzYkN3d0xEVXdMREJkL0NPREUxMCstK0pVSUNFKyUyOFRvYXN0ZXIrVmVyc2lvbiUyOV8oYXVkaW9kZXZpbC5ydSkvQ09ERTEwKyVFMiU4MCU5MytKVUlDRSslMjhUb2FzdGVyK1ZlcnNpb24lMjlfKGF1ZGlvZGV2aWwucnUpP3M9dmsmcj0mY29va2llcz03OTYyMTYwMjUzOV8xLmNvb2tpZQ==",
    },
    {
      trackDownloadId: 9,
      track:
        "https://audiodevil.ru/getmp3/MC9ORGMwTkRrNU1UVXpYelExTmpjNE5ESXlOMTlqT0Rrd1pXVTJOVGczWWpVeFpUaGxZelJmWm1JNU1EaGpZbVl5TUdNNE9EbGxabU5rTHp3aGZDRS1XeUpuY3lJc01URXNJaVZFTUNVNVFTVkVNQ1ZDT0NWRU1TVTRPQ1ZFTUNWQ1FpVkVNQ1ZDTUNWRU1DVkNRU0lzTVN4dWRXeHNMREFzTlRBc01GMD0vJUQwJTlBJUQwJUI4JUQxJTg4JUQwJUJCJUQwJUIwJUQwJUJBKy0rJUQwJUFEJUQwJUI5XyhhdWRpb2RldmlsLnJ1KS8lRDAlOUElRDAlQjglRDElODglRDAlQkIlRDAlQjAlRDAlQkErJUUyJTgwJTkzKyVEMCVBRCVEMCVCOV8oYXVkaW9kZXZpbC5ydSk/cz12ayZyPSZjb29raWVzPTc5MzEzOTc3NjU5XzEuY29va2ll",
    },
    {
      trackDownloadId: 10,
      track:
        "https://audiodevil.ru/getmp3/MC9ORGMwTkRrNU1qZ3hYelExTmpnd016VTBPVjh4WVRnME5XTmxabVV5Wm1ReU1XSXhOR05mTm1KaE9XWmtaRGMyWVRRNFlURXpaREl4THp3aGZDRS1XeUpuY3lJc05Dd2lKVVF3SlRsQkpVUXdKVUk0SlVReEpUZzRKVVF3SlVKQ0pVUXdKVUl3SlVRd0pVSkJLeVZFTVNVNE5TVkVNQ1ZDUlNWRU1DVkNRaVZFTUNWQ1JTVkVNQ1ZDTkNWRU1DVkNSQ1ZFTUNWQ1JTSXNNU3h1ZFd4c0xEQXNOVEFzTUYwPS8lRDAlOUElRDAlQjglRDElODglRDAlQkIlRDAlQjAlRDAlQkErLSslRDAlQTUlRDAlQkUlRDAlQkIlRDAlQkUlRDAlQjQlRDAlQkQlRDAlQkVfKGF1ZGlvZGV2aWwucnUpLyVEMCU5QSVEMCVCOCVEMSU4OCVEMCVCQiVEMCVCMCVEMCVCQSslRTIlODAlOTMrJUQwJUE1JUQwJUJFJUQwJUJCJUQwJUJFJUQwJUI0JUQwJUJEJUQwJUJFXyhhdWRpb2RldmlsLnJ1KT9zPXZrJnI9JmNvb2tpZXM9NzkzMTM5Nzc2NTlfMS5jb29raWU=",
    },
    {
      trackDownloadId: 11,
      track:
        "https://audiodevil.ru/getmp3/MC9NelF6TnpreE1UUXhYelExTmpJME5USXlOMTlsTURjNFlUUXlOVE0yT0dWbE9EUmxZMkZmTURVME1qSm1OV1F3TXpNelpUVTFNVFZoTHp3aGZDRS1XeUpuY3lJc09Td2lKVVF3SlRsQkpVUXdKVUk0SlVReEpUZzRKVVF3SlVKQ0pVUXdKVUl3SlVRd0pVSkJLeVZFTVNVNE1DVkVNQ1ZDTmlWRU1DVkNNQ1ZFTUNWQ01pVkVNU1U0UWlWRU1DVkNPU0lzTVN4dWRXeHNMREFzTlRBc01GMD0vJUQwJTlBJUQwJUI4JUQxJTg4JUQwJUJCJUQwJUIwJUQwJUJBKy0rJUQwJUEwJUQwJUI2JUQwJUIwJUQwJUIyJUQxJThCJUQwJUI5XyhhdWRpb2RldmlsLnJ1KS8lRDAlOUElRDAlQjglRDElODglRDAlQkIlRDAlQjAlRDAlQkErJUUyJTgwJTkzKyVEMCVBMCVEMCVCNiVEMCVCMCVEMCVCMiVEMSU4QiVEMCVCOV8oYXVkaW9kZXZpbC5ydSk/cz12ayZyPSZjb29raWVzPTc5NjEwNTAxNjIxXzEuY29va2ll",
    },
    {
      trackDownloadId: 12,
      track:
        "https://ruo.morsmusic.org/load/268846076/WormGanger_molodojj_kaluga_VALYUTA_SKURATOV_-_Ponedelnik_(musmore.org).mp3",
    },
    {
      trackDownloadId: 13,
      track:
        "https://audiodevil.ru/getmp3/MC9OVEl5TkRZM05qRTRYelExTmpJME5qQTJPVjg1WlRFeFpUZzVOVGRrWWpRNE1XSmxObVJmWmpkall6UmhNVEk0TTJVM1lqVTFaRFJpTHp3aGZDRS1XeUpuY3lJc01Dd2lWMjl5YlVkaGJtZGxjaVV5UXlzbFJEQWxRa01sUkRBbFFrVWxSREFsUWtJbFJEQWxRa1VsUkRBbFFqUWxSREFsUWtVbFJEQWxRamtySlVRd0pVSkJKVVF3SlVJd0pVUXdKVUpDSlVReEpUZ3pKVVF3SlVJekpVUXdKVUl3SlRKREswTlBSRVU0TUNzbFJUSWxPREFsT1RNckpVUXdKVUU0SlVReEpUZ3dKVVF3SlVJd0pVUXdKVUpESlVReEpUaENJaXd4TEc1MWJHd3NNQ3cxTUN3d1hRPT0vV29ybUdhbmdlcislMjYrJUQwJUJDJUQwJUJFJUQwJUJCJUQwJUJFJUQwJUI0JUQwJUJFJUQwJUI5KyVEMCVCQSVEMCVCMCVEMCVCQiVEMSU4MyVEMCVCMyVEMCVCMCslMjYrQ09ERTgwKyUyNitNQVlPVCstKyVEMCVBOCVEMSU4MCVEMCVCMCVEMCVCQyVEMSU4Ql8oYXVkaW9kZXZpbC5ydSkvV29ybUdhbmdlcislMjYrJUQwJUJDJUQwJUJFJUQwJUJCJUQwJUJFJUQwJUI0JUQwJUJFJUQwJUI5KyVEMCVCQSVEMCVCMCVEMCVCQiVEMSU4MyVEMCVCMyVEMCVCMCslMjYrQ09ERTgwKyUyNitNQVlPVCslRTIlODAlOTMrJUQwJUE4JUQxJTgwJUQwJUIwJUQwJUJDJUQxJThCXyhhdWRpb2RldmlsLnJ1KT9zPXZrJnI9JmNvb2tpZXM9Nzk2MDIyOTk1NzVfMS5jb29raWU=",
    },
    {
      trackDownloadId: 14,
      track:
        "https://mus.zvukofon.com/dl/1557432084/WormGanger_molodojj_kaluga_blago_white_danchainz_-_Ni_slova_(musportal.org).mp3",
    },
    {
      trackDownloadId: 15,
      track:
        "https://audio-paladin.ru/getmp3/MC9NakV6TkRVek1UY3pYelExTmpJME1EZzJNbDgxTWpNelpUUXlObVZtWm1ReU1HWmtOVEJmT1RBMk1qaGtOemc0WldWbFpEUXlaVE0xTHp3aGZDRS1XeUpuY3lJc01Dd2lKVVF3SlRrM0pVUXdKVUl5SlVRd0pVSTFKVVF4SlRnd0pVUXdKVUkxSlVRd0pVSXlLeVZFTUNWQk1TVkVNQ1ZDTlNWRU1TVTRNQ1ZFTUNWQ015VkVNQ1ZDTlNWRU1DVkNPU3NsUlRJbE9EQWxPVE1yUkc5c1kyVXJSMkZpWW1GdVlTSXNNU3h1ZFd4c0xEQXNOREFzTUYwPS8lRDAlOTclRDAlQjIlRDAlQjUlRDElODAlRDAlQjUlRDAlQjIrJUQwJUExJUQwJUI1JUQxJTgwJUQwJUIzJUQwJUI1JUQwJUI5Ky0rRE9MQ0UrYW5kK0dBQkJBTkErJUQwJUIwJUQxJTg1JUQwJUIwJUQxJTg1JUQwJUIwJUQxJTg1JUQwJUIwJUQxJTg1XyhhdWRpby1wYWxhZGluLnJ1KS8lRDAlOTclRDAlQjIlRDAlQjUlRDElODAlRDAlQjUlRDAlQjIrJUQwJUExJUQwJUI1JUQxJTgwJUQwJUIzJUQwJUI1JUQwJUI5KyVFMiU4MCU5MytET0xDRSthbmQrR0FCQkFOQSslRDAlQjAlRDElODUlRDAlQjAlRDElODUlRDAlQjAlRDElODUlRDAlQjAlRDElODVfKGF1ZGlvLXBhbGFkaW4ucnUpP3M9dmsmcj0mY29va2llcz03OTY3OTMyNDMxMl8xLmNvb2tpZQ==",
    },
    {
      trackDownloadId: 16,
      track:
        "https://audio-paladin.ru/getmp3/MC9NemN4T0RJeE1UbGZOakkyTWprNE5qbGZZekl5WXpFM1pUTXlNVEJoTWpWak1XRmxYemMyTWpnd05HSTVNMk0zTVRZelpXUTRNeTg4SVh3aFBsc2laM01pTERJc0lpVkVNQ1ZCTVNWRU1DVkNOU1ZFTVNVNE1DVkVNQ1ZDTXlWRU1DVkNOU1ZFTUNWQ09Tc2xSREFsT1RjbFJEQWxRaklsUkRBbFFqVWxSREVsT0RBbFJEQWxRalVsUkRBbFFqSXJKVVV5SlRnd0pUa3pLeVZFTUNWQk1DVkVNQ1ZDTUNWRU1DVkNOQ1ZFTUNWQ09Dc2xSREVsT0RJbFJEQWxRalVsUkRBbFFqRWxSREVsT0VZaUxERXNiblZzYkN3d0xEUXdMREJkLyVEMCVBMSVEMCVCNSVEMSU4MCVEMCVCMyVEMCVCNSVEMCVCOSslRDAlOTclRDAlQjIlRDAlQjUlRDElODAlRDAlQjUlRDAlQjIrLSslRDAlQTAlRDAlQjAlRDAlQjQlRDAlQjgrJUQwJUEyJUQwJUI1JUQwJUIxJUQxJThGXyhhdWRpby1wYWxhZGluLnJ1KS8lRDAlQTElRDAlQjUlRDElODAlRDAlQjMlRDAlQjUlRDAlQjkrJUQwJTk3JUQwJUIyJUQwJUI1JUQxJTgwJUQwJUI1JUQwJUIyKyVFMiU4MCU5MyslRDAlQTAlRDAlQjAlRDAlQjQlRDAlQjgrJUQwJUEyJUQwJUI1JUQwJUIxJUQxJThGXyhhdWRpby1wYWxhZGluLnJ1KT9zPXZrJnI9JmNvb2tpZXM9Nzk2MjU0OTY2NzFfMS5jb29raWU=",
    },
    {
      trackDownloadId: 17,
      track:
        "https://audio-paladin.ru/getmp3/MC9NakF4TURVMU1qRTVYelF6T0Rrd05Ea3dPVjg1WWpnMU1HRXlNMlkyTVRZek16azBZbUpmT1dRMlpqSm1PVGM0TkdOaFpqVTRaVGswTHp3aGZDRS1XeUpuY3lJc015d2lNREkwS3lWRU1DVkJNU1ZFTUNWQ05TVkVNU1U0TUNWRU1DVkNNeVZFTUNWQ05TVkVNQ1ZDT1NzbFJEQWxPVGNsUkRBbFFqSWxSREFsUWpVbFJERWxPREFsUkRBbFFqVWxSREFsUWpJckpVVXlKVGd3SlRrekt5VkVNQ1ZCUmlzbFJEQWxRa0lsUkRFbE9FVWxSREFsUWpFbFJEQWxRa0lsUkRFbE9FVXJKVVF4SlRneUpVUXdKVUkxSlVRd0pVSXhKVVF4SlRoR0t5VkVNQ1ZDTkNWRU1DVkNSU3NsUkRFbE9ERWxSREFsUWtJbFJEQWxRalVsUkRBbFFqY2lMREVzYm5Wc2JDd3dMRFF3TERCZC8lRDAlQTElRDAlQjUlRDElODAlRDAlQjMlRDAlQjUlRDAlQjkrJUQwJTk3JUQwJUIyJUQwJUI1JUQxJTgwJUQwJUI1JUQwJUIyKy0rJUQwJUFGKyVEMCVCQiVEMSU4RSVEMCVCMSVEMCVCQiVEMSU4RSslRDElODIlRDAlQjUlRDAlQjElRDElOEYrJUQwJUI0JUQwJUJFKyVEMSU4MSVEMCVCQiVEMSU5MSVEMCVCN18oYXVkaW8tcGFsYWRpbi5ydSkvJUQwJUExJUQwJUI1JUQxJTgwJUQwJUIzJUQwJUI1JUQwJUI5KyVEMCU5NyVEMCVCMiVEMCVCNSVEMSU4MCVEMCVCNSVEMCVCMislRTIlODAlOTMrJUQwJUFGKyVEMCVCQiVEMSU4RSVEMCVCMSVEMCVCQiVEMSU4RSslRDElODIlRDAlQjUlRDAlQjElRDElOEYrJUQwJUI0JUQwJUJFKyVEMSU4MSVEMCVCQiVEMSU5MSVEMCVCN18oYXVkaW8tcGFsYWRpbi5ydSk/cz12ayZyPSZjb29raWVzPTc5MzA5Mjg4MjkzXzEuY29va2ll",
    },
    {
      trackDownloadId: 18,
      track:
        "https://ruo.morsmusic.org/load/1479958373/White_Punk_-_SHipy_(musmore.org).mp3",
    },
    {
      trackDownloadId: 19,
      track:
        "https://ruo.morsmusic.org/load/749807261/White_Punk_-_Snova_(musmore.org).mp3",
    },
    {
      trackDownloadId: 20,
      track:
        "https://topde.net/uploads/music/2023/11/White_Punk_feat_xxxmanera_Ya_pomnyu.mp3",
    },
    {
      trackDownloadId: 21,
      track:
        "https://audiodevil.ru/getmp3/MC9OamMwTlRZMU16VTNYelExTmpJME1EazBObDlqTm1VM05EWXdOamxsTWpKa1lUUTJaVEpmTnpJNE1qbG1ZelpoWXpBNFpXVXhNemMxTHp3aGZDRS1XeUpuY3lJc05Dd2lKVVF3SlRsREpVUXdKVUpGSlVRd0pVSkNKVVF3SlVKRkpVUXdKVUkwSlVRd0pVSkZKVVF3SlVJNUt5VkVNQ1U1UVNWRU1DVkNNQ1ZFTUNWQ1FpVkVNU1U0TXlWRU1DVkNNeVZFTUNWQ01Dc2xSVElsT0RBbE9UTXJSbUZ6ZEN0TWFXWmxJaXd4TEc1MWJHd3NNQ3cxTUN3d1hRPT0vJUQwJUJDJUQwJUJFJUQwJUJCJUQwJUJFJUQwJUI0JUQwJUJFJUQwJUI5KyVEMCVCQSVEMCVCMCVEMCVCQiVEMSU4MyVEMCVCMyVEMCVCMCstK0Zhc3QrTGlmZV8oYXVkaW9kZXZpbC5ydSkvJUQwJUJDJUQwJUJFJUQwJUJCJUQwJUJFJUQwJUI0JUQwJUJFJUQwJUI5KyVEMCVCQSVEMCVCMCVEMCVCQiVEMSU4MyVEMCVCMyVEMCVCMCslRTIlODAlOTMrRmFzdCtMaWZlXyhhdWRpb2RldmlsLnJ1KT9zPXZrJnI9JmNvb2tpZXM9Nzk3Nzg5MDQ3ODRfMS5jb29raWU=",
    },
    {
      trackDownloadId: 22,
      track:
        "https://grizzlymusic.ru/getmp3/MC9MVEl4T0RnMU9EYzVNRjgwTlRZeU16azBNVFJmTm1ZME56Y3dNbVJqTTJVME5UQTBORFk1WHpJM1lUYzFaVEJsWlRBMlltWTJZVFZpTnk4OElYd2hQbHNpWjNNaUxEVXNJaVZFTUNWQ1F5VkVNQ1ZDUlNWRU1DVkNRaVZFTUNWQ1JTVkVNQ1ZDTkNWRU1DVkNSU1ZFTUNWQ09Tc2xSREFsUWtFbFJEQWxRakFsUkRBbFFrSWxSREVsT0RNbFJEQWxRak1sUkRBbFFqQXJKVVV5SlRnd0pUa3pLeVZFTUNVNVJDVkVNQ1ZDTlNzbFJEQWxRa1VsUkRBbFFqRWxSREFsUWpRbFJEQWxRalVsUkRBbFFrSWxSREVsT1RFbFJEQWxRa1FpTERFc2JuVnNiQ3d3TERZd0xEQmQvJUQwJTlDJUQwJTlFJUQwJTlCJUQwJTlFJUQwJTk0JUQwJTlFJUQwJTk5KyVEMCU5QSVEMCU5MCVEMCU5QiVEMCVBMyVEMCU5MyVEMCU5MCstKyVEMCU5RCVEMCU5NSslRDAlOUUlRDAlOTElRDAlOTQlRDAlOTUlRDAlOUIlRDAlODElRDAlOUQrRkxJUCtQUk9EK1NXSVNIXyhncml6emx5bXVzaWMucnUpLyVEMCU5QyVEMCU5RSVEMCU5QiVEMCU5RSVEMCU5NCVEMCU5RSVEMCU5OSslRDAlOUElRDAlOTAlRDAlOUIlRDAlQTMlRDAlOTMlRDAlOTArJUUyJTgwJTkzKyVEMCU5RCVEMCU5NSslRDAlOUUlRDAlOTElRDAlOTQlRDAlOTUlRDAlOUIlRDAlODElRDAlOUQrRkxJUCtQUk9EK1NXSVNIXyhncml6emx5bXVzaWMucnUpP3M9dmsmcj0mY29va2llcz03OTEwNDU1NjI2NV8xLmNvb2tpZQ==",
    },
    {
      trackDownloadId: 23,
      track:
        "https://cdn.muzsky.net/?h=JGraYpdVSLVHJPvqELiukBSe4TnxKfjxnwntwt0-UdK1ppEUSyFBGPrCqpPDTVMrgJ61OfLZ5ieOKc3XyYs-8HDGJhSUVEg1HrlzUKM-WffMI0ncrGqczEKWcXmBIKeRSmfmU55kSEkay6uGxElU",
    },
  ];

  for (const item of data) {
    await prisma.trackDownload.create({
      data: item,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

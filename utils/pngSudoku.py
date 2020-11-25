#!/usr/bin/python
# -*- coding: UTF-8 -*- 

import cv2
from PIL import Image
import numpy as np
import os
import tkFileDialog
import Tkinter
import tkMessageBox

# 比较两行是否相等
# 相等返回true，否则返回false
def equal_row_pixel(img,row1,row2):
    height = img.shape[0]        #将tuple中的元素取出，赋值给height，width，channels
    width = img.shape[1]
    channels = img.shape[2]
    if(row1 < 0 or row1 >= height):
    	return False
    if(row2 < 0 or row2 >= height):
    	return False
    for col in range(width):
        for channel in range(channels):
            if(img[row1][col][channel] != img[row2][col][channel]):
                return False
    return True

# 比较两列是否相等
# 相等返回true，否则返回false
def equal_col_pixel(img,col1,col2):
    height = img.shape[0]        #将tuple中的元素取出，赋值给height，width，channels
    width = img.shape[1]
    channels = img.shape[2]
    if(col1 < 0 or col1 >= width):
        	return False
    if(col2 < 0 or col2 >= width):
    	return False
    for row in range(height):
        for channel in range(channels):
            if(img[row][col1][channel] != img[row][col2][channel]):
                return False
    return True


# 横向是否可以处理九宫
# img:图片
# continuous_col_num:连续的列数，大于等于这个值判定为横向可以九宫处理
def horizontal_slice(img,continuous_col_num):
    cur_begin_col_index = 0
    cur_end_col_index = 0
    slice_begin_col_index = 0
    slice_end_col_index = 0
    height = img.shape[0]
    width = img.shape[1]
    channels = img.shape[2]
    for col in range(width):
        if(col < width - 1):
            if(equal_col_pixel(img,col,col+1) == False):
                # begin与end指向不是同一列时，判断连续列数是否满足九宫条件
                if((cur_begin_col_index != cur_end_col_index) and (cur_end_col_index - cur_begin_col_index >= continuous_col_num) and (cur_end_col_index - cur_begin_col_index > slice_end_col_index - slice_begin_col_index)):
                    # 已经达到了连续列数，满足九宫条件
                    slice_begin_col_index = cur_begin_col_index
                    slice_end_col_index = cur_end_col_index
                cur_begin_col_index = col + 1
                cur_end_col_index = col + 1
            else:
                # 相等，end后移一位
                cur_end_col_index = col + 1
    if(slice_end_col_index - slice_begin_col_index >= continuous_col_num):
        return True,slice_begin_col_index,slice_end_col_index
    else:
        return False,0,0

# 纵向是否可以处理九宫
def vertical_slice(img,continuous_row_num):
    cur_begin_row_index = 0
    cur_end_row_index = 0
    slice_begin_row_index = 0
    slice_end_row_index = 0
    height = img.shape[0]
    width = img.shape[1]
    channels = img.shape[2]
    for row in range(height):
        if(row < height - 1):
            if(equal_row_pixel(img,row,row+1) == False):
                if((cur_begin_row_index != cur_end_row_index) and (cur_end_row_index - cur_begin_row_index >= continuous_row_num) and (cur_end_row_index - cur_begin_row_index > slice_end_row_index - slice_begin_row_index)):
                    slice_begin_row_index = cur_begin_row_index
                    slice_end_row_index = cur_end_row_index
                cur_begin_row_index = row + 1
                cur_end_row_index = row + 1
            else:
                cur_end_row_index = row + 1
    if(slice_end_row_index - slice_begin_row_index >= continuous_row_num):
        return True,slice_begin_row_index,slice_end_row_index
    else:
        return False,0,0

# 标记Sprite的九宫区域
def tag_image_slice_area(img,slice_row_begin,slice_row_end,slice_col_begin,slice_col_end,color):
    height = img.shape[0]
    width = img.shape[1]
    channels = img.shape[2]
    for row in range(height):    #遍历每一行
        for col in range(width): #遍历每一列
            if((row >= slice_row_begin and row <= slice_row_end and slice_row_begin != slice_row_end) or (col >= slice_col_begin and col <= slice_col_end and slice_col_begin != slice_col_end)):
                alter_image_pixel_color(img,row,col,color)
    return img


# 修改img指定像素的颜色
# img:修改的img
# row:行索引
# col:列索引
# color:颜色rgb数组
def alter_image_pixel_color(img,row,col,color):
    img.itemset((row, col, 0), color[0])
    img.itemset((row, col, 1), color[1])
    img.itemset((row, col, 2), color[2])

# 九宫区域裁剪
def tailor_image_slice_area(img,slice_row_begin,slice_row_end,slice_col_begin,slice_col_end):
    height = img.shape[0]
    width = img.shape[1]
    new_width = width - (slice_col_end - slice_col_begin)
    new_height = height - (slice_row_end - slice_row_begin)
    target = np.zeros(shape=(new_height,new_width,img.shape[2]), dtype=np.uint8)
    
    # img[0:4,0:3] 第0行-第4行，第0列到第3列的交叉区域

    # 左上
    roiImg = img[0:slice_row_begin,0:slice_col_begin]
    target[0:slice_row_begin,0:slice_col_begin] = roiImg

    # 右上
    roiImg = img[0:slice_row_begin,slice_col_end:width]
    target[0:slice_row_begin,slice_col_begin:new_width] = roiImg

    # 左下
    roiImg = img[slice_row_end:height,0:slice_col_begin]
    target[slice_row_begin:new_height,0:slice_col_begin] = roiImg

    # 右下
    roiImg = img[slice_row_end:height,slice_col_end:width]
    target[slice_row_begin:new_height,slice_col_begin:new_width] = roiImg

    return target

def load_sprite():
    continuous_row_num_input_str = continuous_row_num_input.get() #获取文本框内容
    continuous_col_num_input_str = continuous_col_num_input.get()
    continuous_row_num = 0
    continuous_col_num = 0
    try:
        if continuous_row_num_input_str != "":
            continuous_row_num = float(continuous_row_num_input_str)
        if continuous_col_num_input_str != "":
            continuous_col_num = float(continuous_col_num_input_str)
    except ValueError:
        tkMessageBox.showinfo( "Error", "无效的线宽输入")
        return
    if continuous_row_num <= 0 or continuous_col_num <= 0:
        tkMessageBox.showinfo( "Error", "无效的线宽输入")
        return

    fname = tkFileDialog.askopenfilename(title=u"选择文件")
    img1 = cv2.imread(fname,cv2.IMREAD_UNCHANGED)
    a1,b1,c1 = horizontal_slice(img1,continuous_col_num)
    a2,b2,c2 = vertical_slice(img1,continuous_row_num)

    # 九宫区域保留在3像素的宽高
    b1 = b1 + 1
    c1 = c1 - 1
    b2 = b2 + 1
    c2 = c2 - 1
    if toggle_tailor_hor.get() == 0:
        b1 = 0
        c1 = 0
    if toggle_tailor_ver.get() == 0:
        b2 = 0
        c2 = 0
    new_sprite = tailor_image_slice_area(img1,b2,c2,b1,c1)
    cv2.imwrite(fname, new_sprite)
    print(fname)

root = Tkinter.Tk()
root.geometry('400x300')
root.title("Sprite九宫区域极致裁剪修改器")

frame = Tkinter.Frame(root)
frame.pack()

toggle_tailor_hor = Tkinter.IntVar()
toggle_tailor_ver = Tkinter.IntVar()

Tkinter.Checkbutton(root, text = "是否横向九宫处理", variable = toggle_tailor_hor,onvalue = 1, offvalue = 0).pack()
Tkinter.Checkbutton(root, text = "是否纵向九宫迷宫", variable = toggle_tailor_ver,onvalue = 1, offvalue = 0).pack()

Tkinter.Label(frame, text="横向最小连续列数").pack()
continuous_row_num_input = Tkinter.Entry(frame)
continuous_row_num_input.pack()

Tkinter.Label(frame, text="纵向最小连续行数").pack()
continuous_col_num_input = Tkinter.Entry(frame)
continuous_col_num_input.pack()

load_sprite_button = Tkinter.Button(root, text="加载Sprite文件并修改",command=load_sprite)
load_sprite_button.pack()

root.mainloop()